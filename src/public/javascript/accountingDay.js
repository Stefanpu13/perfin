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

    onOpen(index) {
        this.props.onOpen(index)
    }

    render() {
        return (
            <tbody>
            {this.props.accountingDates.map((d, i) => {
                    return <tr key={i}>
                        {/*Date col*/}
                        <td className="col-xs-2">
                            <div >
                                {moment(this.props.startDate).add(i, 'd').format('MM/DD/YYYY')}
                            </div>
                        </td>
                        {/*Value col*/}
                        <td className="col-xs-3">
                            {Number(d)} лв
                        </td>
                        {/*Edit value*/}
                        <td className="col-xs-1">
                            <div className="text-center"
                                 onClick={() => this.onOpen(i)}>

                                <span className="glyphicon glyphicon-pencil"></span>

                            </div>
                        </td>
                        {/*Add new value*/}
                        <td className="col-xs-1">
                            <div className=
                                     "text-center">
                                <span className="glyphicon glyphicon-plus text-center"></span>
                            </div>
                        </td>
                    </tr>
                }
            )}
            </tbody>
        );
    }
}