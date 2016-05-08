/**
 * Created by stefan on 3/10/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

export default class StatementPeriodDay extends React.Component {
    constructor(props) {
        super(props);
    }

    setIsSelected() {
        return this.props.isSelected ? ' statement-period-table-day-selected' : '';
    }

    render() {


        return (
            <tr>
                {/*Date col*/}
                <td className={"col-xs-2 statement-period-table-day" + this.setIsSelected()}
                    //style={this.setDayStyle()}
                    onClick={() => this.props.selectStatementPeriodDay(this.props.statementPeriodDay)}>
                    <div >
                        {moment(this.props.statementPeriodDay.day).format('MM/DD/YYYY')}
                    </div>
                </td>
                {/*Value col*/}
                <td className="col-xs-3">
                    {this.props.total} лв
                </td>
                {/*Edit value*/}
                {
                    this.props.showEditButtonRow ?
                        <td className="col-xs-1 statement-period-table-edit">
                            <div className="text-center"
                                 onClick={() => this.props.openEditExpenseModal()}
                            >
                                <span className="glyphicon glyphicon-pencil"></span>
                            </div>
                        </td>
                        :
                        undefined
                }
                {/*Add new value*/}
                <td className="col-xs-1 statement-period-table-edit">
                    <div className="text-center"
                         onClick={() => this.props.openAddExpenseModal()}>
                        <span className="glyphicon glyphicon-plus text-center"></span>
                    </div>
                </td>
            </tr>
        )
    }
}