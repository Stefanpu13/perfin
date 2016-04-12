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
    $.get('http://localhost:3000/api/monthlyStatementPeriod/getCurrent', (res) => {
        this.setState({currentStatementPeriod: res, loaded: true});
    });
}

export default class HomePageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentStatementPeriod: undefined};
    }

    componentDidMount() {
        getCurrentStatementPeriod.apply(this);
    }

    onEditExpense(newExpenses, day, category, subcategory) {
        var statementPeriod = JSON.parse(JSON.stringify(this.state.currentStatementPeriod));
        var statementPeriodDay = statementPeriod.statementPeriodDays.find(std => {
            return std.day == day;
        });

        var oldExpenses = statementPeriodDay.expenses || {};
        oldExpenses[category] = oldExpenses[category] || {};
        oldExpenses[category][subcategory] = Number(newExpenses);
        statementPeriodDay.expenses = oldExpenses;

        // update statement period, then update state
        $.post('http://localhost:3000/api/monthlyStatementPeriod/update', statementPeriod,
            (res) => {
                this.setState({currentStatementPeriod: statementPeriod});
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

        $.post('http://localhost:3000/api/monthlyStatementPeriod/create', periodFirstDay, (res) => {
            this.setState({currentStatementPeriod: res});
        });
        // make request to create the start date
        // then receive new statementPeriod and change 'current statement Period value'
    }

    render() {
        return (
            <HomePage currentStatementPeriod={this.state.currentStatementPeriod}
                      categoryTree={getCategoriesStructure()}
                      loaded={this.state.loaded}
                      onEditExpense={(newExpenses, day, category, subcategory) =>
                      this.onEditExpense(newExpenses, day, category, subcategory)}
                      onCreateNewStatementPeriod={(periodFirstDay) => this.onCreateNewStatementPeriod(periodFirstDay)}
            >
            </HomePage>
        )
    }
}