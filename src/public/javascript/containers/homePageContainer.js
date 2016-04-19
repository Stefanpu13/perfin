/**
 * Created by stefan on 3/26/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from '../homePage'

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
        .then((res) => {
            return res.json();
        })
        .then((currentStatementPeriod) => {
            this.setState({currentStatementPeriod: currentStatementPeriod, loaded: true});
        });
    //$.get('http://localhost:3000/api/monthlyStatementPeriod/getCurrent', (res) => {
    //    this.setState({currentStatementPeriod: res, loaded: true});
    //});
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
        //$.post({
        //    beforeSend: function (xhrObj) {
        //        xhrObj.setRequestHeader("Content-Type", "application/json");
        //        xhrObj.setRequestHeader("Accept", "application/json");
        //    },
        //    url: url,
        //    data: JSON.stringify(updatedExpenses),
        //    dataType: 'json',
        //    success: (res) => {
        //        this.setState({currentStatementPeriod: res});
        //    }
        //});

        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedExpenses)
        })
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

        //$.post('http://localhost:3000/api/monthlyStatementPeriod/create', periodFirstDay, (res) => {
        //    this.setState({currentStatementPeriod: res});
        //});

        fetch('http://localhost:3000/api/monthlyStatementPeriod/create', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: periodFirstDay
        })
            .then((res) => res.json())
            .then(newStatementPeriod => {
                this.setState({currentStatementPeriod: newStatementPeriod});
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