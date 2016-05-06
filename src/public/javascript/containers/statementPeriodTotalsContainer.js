/**
 * Created by stefan on 5/6/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import StatementPeriodTotals from '../statementPeriodTotals'
import fetchSettings from '../http/fetchSettings'
import fetchGlobals from '../http/fetchGlobals'


export default class StatementPeriodTotalsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedStatementPeriod: undefined,
            //selectedStatementPeriodDay: undefined
        };
    }


    render() {
        return (
            <StatementPeriodTotals
                displayedStatementPeriod={this.props.displayedStatementPeriod}
                updateIncome={(newMonthlyIncome) => {
                this.props.updateIncome(newMonthlyIncome)}}>


            </StatementPeriodTotals>

        )
    }
}