/**
 * Created by stefan on 5/6/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import StatementPeriodTotals from '../statementPeriodTotals/statementPeriodTotals'

export default class StatementPeriodTotalsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedStatementPeriod: undefined
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