/**
 * Created by stefan on 3/9/2016.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import AccountingDay from './accountingDay'
import {Table} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'
import {Tabs} from 'react-bootstrap'
import {Tab} from 'react-bootstrap'
import  AccountingDayModal  from './accountingDayModal'
import StatementPeriodTable from './statementPeriodTable'

function renderCategory(category, categoryIndex) {
    return <Tab title={category.name} eventKey={category.name} key={categoryIndex}>
        <Tabs activeKey={this.state.activeSubcategory}
              onSelect={ eventKey => this.onSubcategorySelect(eventKey)}
        >
            <Tab title={category.name + ' totals'} eventKey={category.name + ' totals'}>
                <StatementPeriodTable
                    statementPeriodDays=
                        {this.props.currentStatementPeriod.statementPeriodDays}
                    expensesCategory={category.name}
                    expensesSubcategory={'totals'}
                    onEditExpense={(statementPeriodDay, index) => this.onEditExpense(statementPeriodDay, index)}
                >
                </StatementPeriodTable>
            </Tab>
            {
                category.name === this.state.activeCategory ?
                    category.subcategories.map(renderSubcategory.bind(this, category, categoryIndex)) : ''
            }
        </Tabs>
    </Tab>
}

function renderSubcategory(category, categoryIndex, subCategory, subcategoryIndex) {
    return <Tab title={subCategory} eventKey={category.name + ' ' + subCategory}
                key={categoryIndex + '_' + subcategoryIndex}>
        {
            this.state.activeCategory + ' ' + subCategory === this.state.activeSubcategory ?
                <StatementPeriodTable
                    statementPeriodDays=
                        {this.props.currentStatementPeriod.statementPeriodDays}
                    expensesCategory={category.name}
                    expensesSubcategory={subCategory}
                    onEditExpense={(statementPeriodDay)=>this.onEditExpense(statementPeriodDay)}
                >
                </StatementPeriodTable> : ''
        }
    </Tab>
}

class StatementPeriod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCategory: 'monthly totals',
            activeSubcategory: 'none',
            startDate: new Date('3/10/2016'),
            currentDailyExpenses: 0,
            accountingDates: [3, 4, 5, 7],
            showModal: false
        };
    }

    open(index) {
        this.setState({showModal: true, dayIndex: index});
    }

    close() {
        this.setState({showModal: false})
    }

    onUpdateDailyExpenses(newDailyExpenses, index) {
        //TODO: change value of expenses for given day, category and subcategory in 'homePageContainer'
        let activeCategory = this.state.activeCategory;
        let activeSubcategory = this.state.activeSubcategory.split(' ')[1];

        this.setState({showModal: false});
        this.props.onEditExpense(newDailyExpenses, this.state.day, activeCategory, activeSubcategory)
    }

    handleUserChange(newValue, index) {
        var dates = this.state.accountingDates;
        dates[index] = newValue;
        this.setState({
            accountingDates: dates,
            showModal: false
        });
    }

    onCategorySelect(eventKey) {
        this.setState({
            activeCategory: eventKey,
            activeSubcategory: eventKey + ' totals'
        });
    }

    onSubcategorySelect(eventKey) {
        this.setState({activeSubcategory: eventKey});
    }

    onEditExpense(statementPeriodDay) {
        let activeCategory = this.state.activeCategory;
        let activeSubcategory = this.state.activeSubcategory.split(' ')[1];
        let currentDailyExpenses = statementPeriodDay.expenses[activeCategory][activeSubcategory];

        this.setState({showModal: true, currentDailyExpenses: currentDailyExpenses, day: statementPeriodDay.day});
    }


    render() {
        return (
            this.props.currentStatementPeriod ?
                <div>
                    <Tabs activeKey={this.state.activeCategory}
                          onSelect={eventKey =>this.onCategorySelect(eventKey)}>
                        <Tab eventKey={'monthly totals'} title="Monthly Totals">
                            Render monthly totals here
                        </Tab>
                        {
                            this.props.categoryTree.categories.map(renderCategory.bind(this))
                        }
                    </Tabs>

                    <AccountingDayModal
                        showModal={this.state.showModal}
                        onClose={()=> this.close()}
                        onUpdateDailyExpenses={(newDailyExpenses) => {
                        this.onUpdateDailyExpenses(newDailyExpenses, this.state.dayIndex)}
                        }
                        currentDailyExpenses={this.state.currentDailyExpenses}

                    >
                    </AccountingDayModal>
                </div> :
                <div>
                    <h4>No statement periods exist yet</h4>
                </div>
        );
    }
}

export default StatementPeriod