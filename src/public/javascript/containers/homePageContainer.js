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
    } else {
        return [];
    }
};

export default class HomePageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedStatementPeriod: undefined,
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
                    this.props.showReceivedWarning(err);
                });

            });
    }

    getCurrentStatementPeriod(homeButtonPressed) {
        let url = 'http://localhost:3000/api/monthlyStatementPeriod/getCurrent';
        this.fetchStatementPeriod(url, homeButtonPressed);
    }

    getPreviousStatementPeriod() {
        let currentStatementPeriodId = this.state.displayedStatementPeriod._id;
        let url = 'http://localhost:3000/api/monthlyStatementPeriod/getPrevious/' + currentStatementPeriodId;

        this.fetchStatementPeriod(url);
    }

    getNextStatementPeriod() {
        let currentStatementPeriodId = this.state.displayedStatementPeriod._id;
        let url = 'http://localhost:3000/api/monthlyStatementPeriod/getNext/' + currentStatementPeriodId;

        this.fetchStatementPeriod(url);
    }

    fetchStatementPeriod(url, homeButtonPressed) {
        fetch(url)
            .then(fetchGlobals.checkStatus)
            .then(res => res.json())
            .then((fetchedStatementPeriod) => {

                this.setState({
                    getCurrentStatementPeriodHasError: false,
                    displayedStatementPeriod: fetchedStatementPeriod || this.state.displayedStatementPeriod,
                    homeButtonPressed: homeButtonPressed,
                    loaded: true
                });
            })
            .catch(error => {
                // display dialog with message that current statement period could not be returned
                this.setState({getCurrentStatementPeriodHasError: true, loaded: true});
                error.message = "Could not load current statement period.";
                this.props.showReceivedError(error);
                console.log('request failed', error)
            });
    }

    updateStatementPeriodExpenses(statementPeriodDay, updatedExpenses) {
        var url = 'http://localhost:3000/api/monthlyStatementPeriod/updateExpenses/' +
            this.state.displayedStatementPeriod._id + '/' + statementPeriodDay._id;

        fetch(url, Object.assign({body: JSON.stringify(updatedExpenses)}, fetchSettings.postRequest))
            .then((res) => res.json())
            .then(fetchGlobals.checkStatus)
            .then(updatedStatementPeriod => {
                this.setState({displayedStatementPeriod: updatedStatementPeriod});
            })
            .catch(error => {
                // display message
                let message = "Could not update current statement period.";
                this.props.showReceivedError(message);
                console.log('request failed', error)
            });
    }

    updateStatementPeriodIncome(updatedIncome) {
        let url = 'http://localhost:3000/api/monthlyStatementPeriod/updateIncome/' +
            this.state.displayedStatementPeriod._id;

        fetch(url, Object.assign({body: JSON.stringify(updatedIncome)}, fetchSettings.postRequest))
            .then((res) => res.json())
            .then(fetchGlobals.checkStatus)
            .then(updatedStatementPeriod => {
                this.setState({displayedStatementPeriod: updatedStatementPeriod});
            })
            .catch(error => {
                // display message
                let message = "Could not update current statement period.";
                this.props.showReceivedError(message);
                console.log('request failed', error)
            });
    }

    createNewStatementPeriod(periodFirstDay) {
        let periodDays;
        // check if start Date is defined and valid
        let url = 'http://localhost:3000/api/monthlyStatementPeriod/create';
        if (!periodFirstDay) {
            periodDays = [{
                day: new Date()
            }];
        } else {
            let daysAfterSelectedDay =
                getDaysAfterSelectedDay(periodFirstDay, this.state.displayedStatementPeriod.statementPeriodDays);
            periodDays = [periodFirstDay, ...daysAfterSelectedDay];

            url = url + '/fromPeriod/' + this.state.displayedStatementPeriod._id;
            //validate start date - between the second day of the current period and today
        }

        fetch(url,
            Object.assign({body: JSON.stringify(periodDays)}, fetchSettings.postRequest))
            .then(fetchGlobals.checkStatus)
            .then((res) => res.json())
            .then(newStatementPeriod => {
                let x = newStatementPeriod;
                this.setState({displayedStatementPeriod: newStatementPeriod});
            })
            .catch(error => {

                console.log('request failed', error)
            });
    }

    render() {
        return (
            <HomePage displayedStatementPeriod={this.state.displayedStatementPeriod}
                      homeButtonPressed={this.state.homeButtonPressed}
                      categoryTree={getCategoriesStructure()}
                      loaded={this.state.loaded}
                      getCurrentStatementHasError={this.state.getCurrentStatementPeriodHasError}
                      getCurrentStatementPeriod={this.getCurrentStatementPeriod.bind(this)}
                      getPreviousStatementPeriod={this.getPreviousStatementPeriod.bind(this)}
                      getNextStatementPeriod={this.getNextStatementPeriod.bind(this)}
                      changeExpense={this.updateStatementPeriodExpenses.bind(this)}
                      updateIncome={this.updateStatementPeriodIncome.bind(this)}
                      createNewStatementPeriod={(periodFirstDay) =>
                       this.createNewStatementPeriod(periodFirstDay)}
            >
            </HomePage>
        )
    }
}