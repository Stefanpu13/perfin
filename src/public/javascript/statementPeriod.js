/**
 * Created by stefan on 3/9/2016.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import {Tabs} from 'react-bootstrap'
import {Tab} from 'react-bootstrap'
import  StatementPeriodDayModal  from './statementPeriodDayModal'
import StatementPeriodTable from './statementPeriodTable'

export default class StatementPeriod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCategoryName: 'monthly totals',
            activeSubcategory: 'none',
            currentDailyExpenses: 0,
            showModal: false
        };
    }

    static exists(statementPeriod) {
        return (statementPeriod !== null);
    }

    close() {
        this.setState({showModal: false})
    }

    onUpdateDailyExpenses(newDailyExpenses, index) {
        //TODO: change value of expenses for given day, category and subcategory in 'homePageContainer'
        let activeCategory = this.state.activeCategoryName;
        let activeSubcategory = this.state.activeSubcategory.split(' ')[1];

        this.setState({showModal: false});
        this.props.onEditExpense(this.state.statementPeriodDay, newDailyExpenses, activeCategory, activeSubcategory)
    }

    onAddDailyExpenses(addedDailyExpenses) {
        let activeCategory = this.state.activeCategoryName;
        let activeSubcategory = this.state.activeSubcategory.split(' ')[1];

        this.setState({showModal: false});
        this.props.onAddExpense(this.state.statementPeriodDay, addedDailyExpenses, activeCategory, activeSubcategory)
    }

    onCategorySelect(eventKey) {
        this.setState({
            activeCategoryName: eventKey,
            activeSubcategory: eventKey + ' totals'
        });
    }

    onSubcategorySelect(eventKey) {
        this.setState({activeSubcategory: eventKey});
    }

    onOpenEditExpenseModal(statementPeriodDay) {
        let activeCategory = this.state.activeCategoryName;
        let activeSubcategory = this.state.activeSubcategory.split(' ')[1];
        let currentDailyExpenses =
            statementPeriodDay.expenses &&
            statementPeriodDay.expenses[activeCategory] &&
            statementPeriodDay.expenses[activeCategory][activeSubcategory];

        this.setState({
            showModal: true,
            currentDailyExpenses: currentDailyExpenses || 0,
            statementPeriodDay: statementPeriodDay,
            // state becomes "this" when fn is called like 'this.state.fn()'.
            // but this must be the component
            showSubcategoryInput: false,
            changeDailyExpenses: this.onUpdateDailyExpenses.bind(this)
        });
    }

    onOpenAddExpenseModal(statementPeriodDay) {
        let activeSubcategory = this.state.activeSubcategory.split(' ')[1];
        let showSubcategoryInput = (activeSubcategory === 'totals');

        this.setState({
            showModal: true,
            currentDailyExpenses: 0,
            statementPeriodDay: statementPeriodDay,
            showSubcategoryInput: showSubcategoryInput,
            changeDailyExpenses: this.onAddDailyExpenses.bind(this)
        })
    }

    renderCategory(category, categoryIndex) {
        return <Tab title={category.name} eventKey={category.name} key={categoryIndex}>
            <Tabs activeKey={this.state.activeSubcategory}
                  onSelect={ eventKey => this.onSubcategorySelect(eventKey)}
            >
                {
                    category.name === this.state.activeCategoryName ?
                        category.subcategories
                            .map(this.renderSubcategory.bind(this, category, categoryIndex)) : ''
                }
            </Tabs>
        </Tab>
    }

    renderSubcategory(category, categoryIndex, subCategory, subcategoryIndex) {
        var displayStyle = this.state.activeCategoryName + ' ' + subCategory === this.state.activeSubcategory ?
            '' : 'none';
        var styles = {display: displayStyle};

        return <Tab title={subCategory} eventKey={category.name + ' ' + subCategory}
                    key={categoryIndex + '_' + subcategoryIndex}>
            {
                <StatementPeriodTable style={styles}
                                      statementPeriodDays=
                                          {this.props.currentStatementPeriod.statementPeriodDays}
                                      expensesCategory={category.name}
                                      expensesSubcategory={subCategory}
                                      onOpenEditExpenseModal=
                                          {(statementPeriodDay)=>this.onOpenEditExpenseModal(statementPeriodDay)}
                                      onOpenAddExpenseModal=
                                          {(statementPeriodDay) => this.onOpenAddExpenseModal(statementPeriodDay)}
                >
                </StatementPeriodTable>
            }
        </Tab>
    }

    render() {
        let statementPeriodContent;
        if (this.props.getCurrentStatementHasError) {
            statementPeriodContent = '';
        } else {
            if (StatementPeriod.exists(this.props.currentStatementPeriod)) {
                statementPeriodContent =
                    <div>
                        <Tabs activeKey={this.state.activeCategoryName}
                              onSelect={eventKey =>this.onCategorySelect(eventKey)}>
                            <Tab eventKey={'monthly totals'} title="Monthly Totals">
                                Render monthly totals here
                            </Tab>
                            {
                                this.props.categoryTree.categories
                                    .map((category, i) =>this.renderCategory(category, i))
                            }
                        </Tabs>
                        <StatementPeriodDayModal
                            showModal={this.state.showModal}
                            onClose={()=> this.close()}
                            changeDailyExpenses={(newDailyExpenses) => {
                                    this.state.changeDailyExpenses(newDailyExpenses)
                                }
                            }
                            category={this.props.categoryTree.categories.find( category =>{
                                return category.name === this.state.activeCategoryName;
                            })}
                            showSubcategoryInput={this.state.showSubcategoryInput}
                            currentDailyExpenses={this.state.currentDailyExpenses}
                        >
                        </StatementPeriodDayModal>
                    </div>
            } else {
                statementPeriodContent =
                    <div>
                        <h4>No statement periods exist yet</h4>
                    </div>
            }
        }

        return (
            <div>
                {statementPeriodContent}
            </div>
        );
    }
}