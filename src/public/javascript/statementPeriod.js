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
    return <Tab title={category.name} eventKey={categoryIndex} key={categoryIndex}>
        <Tabs activeKey={this.state.activeSubcategory}
              onSelect={ eventKey => this.handleSubcategorySelect(eventKey)}
        >
            <Tab title={category.name + ' totals'} eventKey={categoryIndex +'_-1'}>
                <StatementPeriodTable
                    statementPeriodDays=
                        {this.props.currentStatementPeriod.statementPeriodDays}
                    expensesCategory={category.name}
                    expensesSubcategory={'totals'}
                    onExpenseClick={this.props.onExpenseClick}
                >
                </StatementPeriodTable>
            </Tab>
            {
                categoryIndex === this.state.activeCategory ?
                    category.subcategories.map(renderSubcategory.bind(this, category, categoryIndex)) : ''
            }
        </Tabs>
    </Tab>
}

function renderSubcategory(category, categoryIndex, subCategory, subcategoryIndex) {
    return <Tab title={subCategory} eventKey={categoryIndex + '_' + subcategoryIndex}
                key={categoryIndex + '_' + subcategoryIndex}>
        {
            this.state.activeCategory + '_' + subcategoryIndex === this.state.activeSubcategory ?
                <StatementPeriodTable
                    statementPeriodDays=
                        {this.props.currentStatementPeriod.statementPeriodDays}
                    expensesCategory={category.name}
                    expensesSubcategory={subCategory}
                    onExpenseClick={this.props.onExpenseClick}
                >
                </StatementPeriodTable> : ''
        }
    </Tab>
}

class StatementPeriod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCategory: -1,
            activeSubcategory: '-1_0',
            startDate: new Date('3/10/2016'),
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

    updateDailyExpenses(newDailyExpenses, index) {
        var dates = this.state.accountingDates;
        dates[index] = newDailyExpenses;
        this.setState({
            accountingDates: dates,
            showModal: false
        });
    }

    handleUserChange(newValue, index) {
        var dates = this.state.accountingDates;
        dates[index] = newValue;
        this.setState({
            accountingDates: dates,
            showModal: false
        });
    }

    handleCategorySelect(eventKey) {
        this.setState({
            activeCategory: eventKey,
            activeSubcategory: eventKey + '_' + (-1)
        });
    }

    handleSubcategorySelect(eventKey) {
        this.setState({activeSubcategory: eventKey});
    }

    render() {
        return (
            this.props.currentStatementPeriod ?
                <div>
                    <Tabs activeKey={this.state.activeCategory}
                          onSelect={eventKey =>this.handleCategorySelect(eventKey)}>
                        <Tab eventKey={-1} title="Monthly Totals">
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
                        this.updateDailyExpenses(newDailyExpenses, this.state.dayIndex)}
                        }
                        currentDailyExpenses={this.state.accountingDates[this.state.dayIndex]}
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