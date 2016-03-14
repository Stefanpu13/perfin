/**
 * Created by stefan on 3/9/2016.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import AccountingDay from './accountingDay'



class AccountingPeriod extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            startDate: new Date('3/10/2016'),
            accountingDates: [3, 4, 5, 7]
        };
    }

    handleUserChange(newValue, index) {
        var dates = this.state.accountingDates;
        dates[index] = newValue;
        this.setState({accountingDates: dates});
    }


    render() {
        return (
            <AccountingDay accountingDates={this.state.accountingDates}
                           startDate = {this.state.startDate}
                           handleUserChange={this.handleUserChange.bind(this)}></AccountingDay>
        );
    }
}

export default AccountingPeriod