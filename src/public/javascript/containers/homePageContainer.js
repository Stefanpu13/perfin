/**
 * Created by stefan on 3/26/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from '../homePage'
import fetchSettings from '../http/fetchSettings'
import fetchGlobals from '../http/fetchGlobals'


function getCategoriesStructure() {
    return {
        categories: [
            {
                name: 'food',
                subcategories: ['totals', 'fruit', 'vegetables', 'meat', 'dairy', 'confections', 'meals', 'other']
            }, {
                name: 'entertainment',
                subcategories: ['totals', 'travel', 'sport', 'pastime', 'other']

            },
            {
                name: 'supplies',
                subcategories: ['totals', 'rent', 'home', 'other']

            }
        ]
    }
}

var getDaysAfterSelectedDay = (selectedDay, statementPeriodDays) => {
    var selectedDayIndex = statementPeriodDays.findIndex(day => selectedDay._id === day._id);
    if (selectedDayIndex > -1) {
        return statementPeriodDays.slice(selectedDayIndex + 1);
    } else{
        return [];
    }
};

export default class HomePageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStatementPeriod: undefined,
            //selectedStatementPeriodDay: undefined
        };
    }

    componentDidMount() {
        this.getCurrentStatementPeriod();
        this.checkForStatementDayCreationError();
    }

    checkForStatementDayCreationError() {
        fetch('http://localhost:3000/api/monthlyStatementPeriod/hasStatementDayCreationError')
            .then(fetchGlobals.checkStatus)
            .catch(error => {
                error.response.json().then(err => {
                    this.props.onWarningReceived(err);
                });

            });
    }

    getCurrentStatementPeriod() {
        fetch('http://localhost:3000/api/monthlyStatementPeriod/getCurrent')
            .then(fetchGlobals.checkStatus)
            .then(res => res.json())
            .then((currentStatementPeriod) => {
                this.setState({
                    getCurrentStatementHasError: false,
                    currentStatementPeriod: currentStatementPeriod,
                    loaded: true
                });
            })
            .catch(error => {
                // display dialog with message that current statement period could not be returned
                this.setState({getCurrentStatementHasError: true, loaded: true});
                error.message = "Could not load current statement period.";
                this.props.onErrorReceived(error);
                console.log('request failed', error)
            });
    }


    updateStatementPeriod(statementPeriodDay, updatedExpenses) {

        var url = 'http://localhost:3000/api/monthlyStatementPeriod/update/' +
            this.state.currentStatementPeriod._id + '/' + statementPeriodDay._id;

        fetch(url, Object.assign({body: JSON.stringify(updatedExpenses)}, fetchSettings.postRequest))
            .then((res) => res.json())
            .then(fetchGlobals.checkStatus)
            .then(updatedStatementPeriod => {
                this.setState({currentStatementPeriod: updatedStatementPeriod});
            })
            .catch(error => {
                // display message
                error.message = "Could not update current statement period.";
                this.props.onErrorReceived(error);
                console.log('request failed', error)
            });
    }

    onCreateNewStatementPeriod(periodFirstDay) {
        let periodDays;
        // check if start Date is defined and valid
        let url = 'http://localhost:3000/api/monthlyStatementPeriod/create';
        if (!periodFirstDay) {
            periodDays = [{
                day: new Date()
            }];
        } else {
            let daysAfterSelectedDay =
                getDaysAfterSelectedDay(periodFirstDay, this.state.currentStatementPeriod.statementPeriodDays);
            periodDays = [periodFirstDay, ...daysAfterSelectedDay];

            url = url + '/fromPeriod/' + this.state.currentStatementPeriod._id;
            //validate start date - between the second day of the current period and today
        }

        fetch(url,
            Object.assign({body: JSON.stringify(periodDays)}, fetchSettings.postRequest))
            .then(fetchGlobals.checkStatus)
            .then((res) => res.json())
            .then(newStatementPeriod => {
                let x = newStatementPeriod;
                this.setState({currentStatementPeriod: newStatementPeriod});
            })
            .catch(error => {

                console.log('request failed', error)
            });
    }

    render() {
        return (
            <HomePage currentStatementPeriod={this.state.currentStatementPeriod}
                      categoryTree={getCategoriesStructure()}
                      loaded={this.state.loaded}
                      getCurrentStatementHasError={this.state.getCurrentStatementHasError}
                      onChangeExpense={this.updateStatementPeriod.bind(this)}
                //onSelectStatementPeriodDay={(statementPeriodDay) =>
                //this.onSelectStatementPeriodDay(statementPeriodDay)}
                      onCreateNewStatementPeriod={(periodFirstDay) => this.onCreateNewStatementPeriod(periodFirstDay)}
            >
            </HomePage>
        )
    }
}