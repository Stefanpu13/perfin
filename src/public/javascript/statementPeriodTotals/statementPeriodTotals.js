/**
 * Created by stefan on 3/26/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Panel} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import moment from 'moment'
import StatementPeriodDayModal  from '../statementPeriodDay/statementPeriodDayModal'
import TotalsIncomeType from './totalsIncomeType'
import TotalsExpenses from './totalsExpenses'
import TotalsIncome from './totalsIncome'
import TotalsHeader from './totalsHeader'
import StatementPeriodTotal from './statementPeriodTotal'

export default class StatementPeriodTotals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            incomeType: 'salary'
        };
    }

    close() {
        this.setState({showModal: false})
    }

    updateIncome(incomeValue) {
        let newIncome = JSON.parse(JSON.stringify(this.props.displayedStatementPeriod.income || {}));
        newIncome[this.state.incomeType] = incomeValue;
        this.setState({showModal: false});

        this.props.updateIncome(newIncome);
    }

    getCashValue(income) {
        return (income && income[this.state.incomeType]) || 0;
    }

    getTotal(){
        let totalIncome = TotalsIncome.getTotalIncome(this.props.displayedStatementPeriod.income);
        let totalExpenses = TotalsExpenses.getTotalExpenses(this.props.displayedStatementPeriod);
        return (totalIncome - totalExpenses).toFixed(2);
    }

    showTotalsModal(incomeType) {
        this.setState({showModal: true, incomeType: incomeType})
    }

    render() {
        const monthlyTotalsHeader =
            <div>
                <TotalsHeader
                    statementPeriodDays={this.props.displayedStatementPeriod.statementPeriodDays}>
                </TotalsHeader>
            </div>;

        return (
            <div>
                <Panel header={monthlyTotalsHeader}>
                    <Col xs={12} sm={6} className="monthly-totals-divider">
                        <TotalsIncome income={this.props.displayedStatementPeriod.income}>
                        </TotalsIncome>
                        <Row className="monthly-totals-row">
                            <TotalsIncomeType
                                income={this.props.displayedStatementPeriod.income}
                                incomeType={"salary"}
                                showTotalsModal={this.showTotalsModal.bind(this)}>
                            </TotalsIncomeType>
                            <TotalsIncomeType
                                income={this.props.displayedStatementPeriod.income}
                                incomeType={"other"}
                                showTotalsModal={this.showTotalsModal.bind(this)}>
                            </TotalsIncomeType>
                        </Row>
                    </Col>
                    <TotalsExpenses
                        displayedStatementPeriod={this.props.displayedStatementPeriod}>
                    </TotalsExpenses>
                    <StatementPeriodTotal
                        total={this.getTotal()}>
                    </StatementPeriodTotal>
                </Panel>
                <StatementPeriodDayModal
                    showModal={this.state.showModal}
                    onClose={()=> this.close()}
                    changeCash={this.updateIncome.bind(this)}
                    cashValue={this.getCashValue(this.props.displayedStatementPeriod.income)}
                >
                </StatementPeriodDayModal>
            </div>
        );
    }
}