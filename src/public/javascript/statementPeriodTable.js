/**
 * Created by stefan on 3/26/2016.
 */
/**
 * Created by stefan on 3/9/2016.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import AccountingDay from './accountingDay'
import {Table} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'

import  AccountingDayModal  from './accountingDayModal'


class StatementPeriodTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //startDate: new Date('3/10/2016'),
            //accountingDates: [3, 4, 5, 7],
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
        //var dates = this.state.accountingDates;
        //dates[index] = newDailyExpenses;
        //this.setState({
        //    accountingDates: dates,
        //    showModal: false
        //});
    }

    onEditExpense(statementPeriodDay, index){
        this.props.onEditExpense(statementPeriodDay, index);
    }


    render() {
        return (
            <div >
                <Table striped bordered condensed
                      // onClick={(event)=> this.onTableClick(event)}
                >
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Money spent</th>
                        <th>Edit expenditures</th>
                        <th>Add to expenditures</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.statementPeriodDays.map((statementPeriodDay, i) => {
                            return <AccountingDay
                                {...this.props}
                                onEditExpense = {(index) => this.onEditExpense(statementPeriodDay, index)}
                                statementPeriodDay={statementPeriodDay}
                                i={i}
                                key={i}
                            >
                            </AccountingDay>
                        })
                    }
                    </tbody>
                </Table>

                {/*<AccountingDayModal
                 showModal={this.state.showModal}
                 onClose={()=> this.close()}
                 onUpdateDailyExpenses={(newDailyExpenses) => {
                 this.updateDailyExpenses(newDailyExpenses, this.state.dayIndex)}
                 }
                 statementPeriodDay={this.props.statementPeriodDays[this.state.dayIndex]}>
                 </AccountingDayModal>*/}
            </div>
        );
    }
}

export default StatementPeriodTable