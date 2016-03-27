/**
 * Created by stefan on 3/10/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

function renderCategoryExpenses(expensesCategory, expensesSubcategory) {
    var total = 0;

    if (expensesCategory) {
        if (expensesSubcategory) {
            total = Number(expensesCategory[expensesSubcategory]) || 0; // NaN || num -> num
        } else {
            for (let subcategory in expensesCategory) {
                total += Number(expensesCategory[subcategory]);
            }
        }
    }

    return total;
}

export default class AccountingDay extends React.Component {
    constructor(props) {
        super(props);
    }

    onExpenseClick(index) {
        this.props.onExpenseClick(index)
    }

    render() {

        var total = renderCategoryExpenses(
            this.props.statementPeriodDay.expenses[this.props.expensesCategory], this.props.expensesSubcategory);

        return (
            <tr>
                {/*Date col*/}
                <td className="col-xs-2">
                    <div >
                        {moment(this.props.statementPeriodDay.day).format('MM/DD/YYYY')}
                    </div>
                </td>
                {/*Value col*/}
                <td className="col-xs-3">
                    {total} лв
                </td>
                {/*Edit value*/}
                <td className="col-xs-1">
                    <div className="text-center"
                        onClick={() => this.onExpenseClick(this.props.i)}
                    >
                        <span className="glyphicon glyphicon-pencil"></span>
                    </div>
                </td>
                {/*Add new value*/}
                <td className="col-xs-1">
                    <div className="text-center">
                        <span className="glyphicon glyphicon-plus text-center"></span>
                    </div>
                </td>
            </tr>
        )
    }
}