/**
 * Created by stefan on 3/26/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Panel} from 'react-bootstrap'
import {Input} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import moment from 'moment'
import StatementPeriodDayModal  from '../statementPeriodDayModal'
import TotalsIncome from './totalsIncome'
import TotalsHeader from './totalsHeader'

export default class StatementPeriodTotals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            incomeType: 'salary',
            updatedIncome: {}
        };
    }

    calculateDailyTotalExpenses(statementPeriodDay) {
        let dayTotalExpenses = 0;
        for (let category in statementPeriodDay.expenses) {
            for (let subcategory in statementPeriodDay.expenses[category]) {
                dayTotalExpenses += statementPeriodDay.expenses[category][subcategory];
            }
        }

        return dayTotalExpenses;
    }

    calculateStatementPeriodTotalExpenses(statementPeriod) {
        let totalExpenses = statementPeriod.statementPeriodDays.reduce((sum, statementPeriodDay) => {
            return sum + this.calculateDailyTotalExpenses(statementPeriodDay);
        }, 0);

        return totalExpenses;
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

    showTotalsModal(incomeType) {
        this.setState({showModal: true, incomeType: incomeType})
    }

    getTotalIncome(income) {
        if (!income) {
            return 0;
        }

        let salary = Number(income.salary) || 0;
        let other = Number(income.other) || 0;
        return salary + other;
    }

    render() {
        const monthlyTotalsHeader =
            <div><TotalsHeader
                statementPeriodDays={this.props.displayedStatementPeriod.statementPeriodDays}>
            </TotalsHeader></div>;

        return (
            <div>
                <Panel header={monthlyTotalsHeader}>
                    <Col xs={12} sm={6} className="monthly-totals-divider">
                        <Row className="monthly-totals-row">
                            <Col xs={4}><h3>Income</h3></Col>
                            <Col >
                                <h3 className="pull-right">
                                    {this.getTotalIncome(this.props.displayedStatementPeriod.income) + ' lv.'}
                                </h3>
                            </Col>
                        </Row>
                        <Row className="monthly-totals-row">
                            <TotalsIncome
                                income={this.props.displayedStatementPeriod.income}
                                incomeType={"salary"}
                                showTotalsModal={this.showTotalsModal.bind(this)}>
                            </TotalsIncome>
                            <TotalsIncome
                                income={this.props.displayedStatementPeriod.income}
                                incomeType={"other"}
                                showTotalsModal={this.showTotalsModal.bind(this)}>
                            </TotalsIncome>
                        </Row>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Row className="monthly-totals-row">
                            <Col xs={4}><h3>Expenses</h3></Col>
                            <Col >
                                <h3 className="pull-right">
                                    {this.calculateStatementPeriodTotalExpenses(
                                        this.props.displayedStatementPeriod) + ' lv.'}
                                </h3>
                            </Col>
                        </Row>
                    </Col>
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