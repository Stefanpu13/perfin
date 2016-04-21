/**
 * Created by stefan on 3/10/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

export default class AccountingDay extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <tr>
                {/*Date col*/}
                <td className="col-xs-2">
                    <div >
                        {moment(this.props.day).format('MM/DD/YYYY')}
                    </div>
                </td>
                {/*Value col*/}
                <td className="col-xs-3">
                    {this.props.total} лв
                </td>
                {/*Edit value*/}
                {
                    this.props.showEditButtonRow ?
                        <td className="col-xs-1">
                            <div className="text-center"
                                 onClick={() => this.props.onEditExpense()}
                            >
                                <span className="glyphicon glyphicon-pencil"></span>
                            </div>
                        </td>
                        :
                        undefined
                }
                {/*Add new value*/}
                <td className="col-xs-1">
                    <div className="text-center"
                         onClick={() => this.props.onAddExpense()}>
                        <span className="glyphicon glyphicon-plus text-center"></span>
                    </div>
                </td>
            </tr>
        )
    }
}