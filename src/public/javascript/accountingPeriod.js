/**
 * Created by stefan on 3/9/2016.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import AccountingDay from './accountingDay'
import {Table} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'
import  AccountingDayModal  from './accountingDayModal'


class AccountingPeriod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    updateDailyExpenses(newDailyExpenses, index){
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

    render() {
        return (
            <div>
                <Table striped bordered condensed>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Money spent</th>
                        <th>Edit expenditures</th>
                        <th>Add to expenditures</th>
                    </tr>
                    </thead>
                    {/*<tbody>*/}
                    <AccountingDay accountingDates={this.state.accountingDates}
                                   startDate={this.state.startDate}
                                   onOpen={(i) => this.open(i)}
                    >
                    </AccountingDay>
                    {/*</tbody>*/}


                </Table>
                <AccountingDayModal
                    showModal={this.state.showModal}
                    onClose={()=> this.close()}
                    onUpdateDailyExpenses={(newDailyExpenses) => {
                        this.updateDailyExpenses(newDailyExpenses, this.state.dayIndex)}
                        }
                    currentDailyExpenses={this.state.accountingDates[this.state.dayIndex]}>
                </AccountingDayModal>
            </div>
        );
    }
}

export default AccountingPeriod