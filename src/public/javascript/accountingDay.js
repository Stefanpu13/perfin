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

    handleChange(i, event) {
        this.props.handleUserChange(event.target.value, i);
    }

    render() {
        return (
            <table>
                <tbody>

                {this.props.accountingDates.map((d, i) => {
                    return <tr key={i}>
                        <td className="dateColumn cell">

                            <span>
                                {moment(this.props.startDate).add(i, 'd').format('MM/DD/YYYY')}
                            </span>
                        </td>
                        <td className="accountColumn cell">
                            <div>
                                {d} лв
                            </div>
                            {/*<input value={d} onChange={this.handleChange.bind(this, i)}/>*/}
                        </td>
                    </tr>
                })}

                </tbody>
            </table>
        );
    }
}