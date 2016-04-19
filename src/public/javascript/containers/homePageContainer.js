/**
 * Created by stefan on 3/26/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from '../homePage'
import fetchSettings from '../http/fetchSettings'
import fetchGlobals from '../http/fetchGlobals'

var currentStatementPeriod = {
    startDate: Date(),
    statementPeriodDays: [
        {
            day: new Date("3/27/2016"),
            expenses: {
                food: {
                    other: 2,
                    vegetables: 2
                },
                entertainment: {
                    other: 12,
                    travel: 33,
                    pastime: 12
                },
                supplies: {}
            }
        },
        {
            day: new Date("3/28/2016"),
            expenses: {
                food: {
                    meat: 6,
                    vegetables: 2
                },
                entertainment: {
                    other: 2,
                    travel: 6,
                    pastime: 6
                },
                supplies: {}
            }
        }],
    incomes: {
        salary: {
            day: Date(),
            value: 250
        },
        other: [{
            day: Date(),
            value: 15
        }]
    },
    endDate: undefined
};

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

function getCurrentStatementPeriod() {

    fetch('http://localhost:3000/api/monthlyStatementPeriod/getCurrent')
        .then(fetchGlobals.checkStatus)
        .then(res => res.json())
        .then((currentStatementPeriod) => {
            this.setState({currentStatementPeriod: currentStatementPeriod, loaded: true});
        })
        .catch(error => {
            console.log('request failed', error)
        });
}

function updateExpenses(newExpensesValue, oldExpenses, category, subcategory) {
    oldExpenses[category] = oldExpenses[category] || {};
    oldExpenses[category][subcategory] = Number(newExpensesValue);
    return oldExpenses;
}

export default class HomePageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentStatementPeriod: undefined};
    }

    componentDidMount() {
        getCurrentStatementPeriod.apply(this);
    }

    onEditExpense(statementPeriodDay, newExpensesValue, category, subcategory) {
        var oldExpenses = JSON.parse(JSON.stringify(statementPeriodDay.expenses || {}));

        var updatedExpenses = updateExpenses(newExpensesValue, oldExpenses, category, subcategory);

        var url = 'http://localhost:3000/api/monthlyStatementPeriod/update/' +
            this.state.currentStatementPeriod._id + '/' + statementPeriodDay._id;

        fetch(url, Object.assign({body: JSON.stringify(updatedExpenses)}, fetchSettings.postRequest))
            .then((res) => res.json())
            .then(updatedStatementPeriod => {
                this.setState({currentStatementPeriod: updatedStatementPeriod});
            });
    }

    onCreateNewStatementPeriod(periodFirstDay) {
        // check if start Date is defined and valid

        if (!periodFirstDay) {
            periodFirstDay = {
                day: new Date()
            }
        } else {
            //validate start date - between the second day of the current period and today
        }

        fetch('http://localhost:3000/api/monthlyStatementPeriod/create',
            Object.assign({body: JSON.stringify(periodFirstDay)}, fetchSettings.postRequest))
            .then(fetchGlobals.checkStatus)
            .then((res) => res.json())
            .then(newStatementPeriod => {
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
                      onEditExpense={(statementPeriodDay,newExpenses,  category, subcategory) =>
                      this.onEditExpense(statementPeriodDay, newExpenses,  category, subcategory)}
                      onCreateNewStatementPeriod={(periodFirstDay) => this.onCreateNewStatementPeriod(periodFirstDay)}
            >
            </HomePage>
        )
    }
}