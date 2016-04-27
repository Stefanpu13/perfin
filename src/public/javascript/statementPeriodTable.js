/**
 * Created by stefan on 3/26/2016.
 */
/**
 * Created by stefan on 3/9/2016.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import StatementPeriodDay from './statementPeriodDay'
import {Table} from 'react-bootstrap'

function getCategoryExpensesTotal(expenses, expensesCategory, expensesSubcategory) {
    var total = 0;

    if (expenses && expenses[expensesCategory]) {
        if (expensesSubcategory === 'totals') {
            for (let subcategory in expenses[expensesCategory]) {
                total += Number(expenses[expensesCategory][subcategory]);
            }
        } else {
            total = Number(expenses[expensesCategory][expensesSubcategory]) || 0; // NaN || num -> num
        }
    }

    return total;
}

class StatementPeriodTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showEditButtonRow: false}
    }

    componentWillReceiveProps(newProps) {
        this.setState({showEditButtonRow: this.props.expensesSubcategory !== 'totals'});
    }

    render() {
        return (
            <div >
                <Table striped bordered condensed>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Money spent</th>
                        {this.state.showEditButtonRow ? <th>Edit expenditures</th> : undefined}
                        <th>Add to expenditures</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.statementPeriodDays.map((statementPeriodDay, i) => {
                            var total =
                                getCategoryExpensesTotal(statementPeriodDay.expenses, this.props.expensesCategory,
                                    this.props.expensesSubcategory);

                            return <StatementPeriodDay
                                total={total}
                                statementPeriodDay={statementPeriodDay}
                                showEditButtonRow={this.state.showEditButtonRow}
                                onSelectStatementPeriodDay={this.props.onSelectStatementPeriodDay}
                                onOpenEditExpenseModal={() => this.props.onOpenEditExpenseModal(statementPeriodDay)}
                                onOpenAddExpenseModal={() => this.props.onOpenAddExpenseModal(statementPeriodDay)}
                                key={i}
                            >
                            </StatementPeriodDay>
                        })
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default StatementPeriodTable