/**
 * Created by stefan on 3/26/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from '../homePage'

function getCategoriesStructure() {
    return {
        categories: [
            {
                name: 'food',
                subcategories: ['fruit', 'vegetables', 'meat', 'dairy', 'confections', 'meals', 'other']
            }, {
                name: 'entertainment',
                subcategories: ['travel', 'sport', 'pastime', 'other']

            },
            {
                name: 'supplies',
                subcategories: ['rent', 'home', 'other']

            }
        ]
    }
}

function getCurrentStatementPeriod() {
    return {
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
                    }
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
                    }
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
    }
}

export default class HomePageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentStatementPeriod: undefined};
    }

    componentDidMount() {
        setTimeout(()=> {
            this.setState({
                loaded: true,
                currentStatementPeriod: getCurrentStatementPeriod()
            });
        }, 2000)
    }

    onExpenseClick(statementPeriodDay, i) {
        console.log(statementPeriodDay);
        console.log(i);
    }

    render() {
        return (
            <HomePage currentStatementPeriod={this.state.currentStatementPeriod}
                      categoryTree={getCategoriesStructure()}
                      loaded={this.state.loaded}
                      onExpenseClick={(statementPeriodDay, i) => this.onExpenseClick(statementPeriodDay, i)}
            >
            </HomePage>
        )
    }
}