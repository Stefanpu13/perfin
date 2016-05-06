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
import  StatementPeriodDayModal  from './statementPeriodDayModal'

export default class StatementPeriodTotals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            monthlyIncome: 0,
            showModal: false
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

    changeMonthlyIncome (newIncome){
        this.setState({monthlyIncome:newIncome, showModal: false});
    }

    close() {
        this.setState({showModal: false})
    }

    render() {
        let daysLength = this.props.displayedStatementPeriod.statementPeriodDays.length;
        const monthlyTotalsHeader =
            <div>
                <Row> <Col sm={4}>Income statement</Col>
                    <Col sm={4}>
                        {"Start Date: " +
                        moment(this.props.displayedStatementPeriod.statementPeriodDays[0].day)
                            .format("MM/DD/YYYY")}
                    </Col>
                    <Col sm={4}>
                        {"End Date: " +
                        moment(this.props.displayedStatementPeriod.statementPeriodDays[daysLength - 1].day)
                            .format("MM/DD/YYYY")}
                    </Col>
                </Row>
            </div>

        return (
            <div>
                <Panel header={monthlyTotalsHeader}>
                    <Col xs={12} sm={6} className="monthly-totals-divider">
                        <Row className="monthly-totals-row">
                            <Col xs={4}><h3>Income</h3></Col>
                            <Col >
                                <h3 className="pull-right">
                                    {"Income lv. "}
                                </h3>
                            </Col>
                        </Row>
                        <Row className="monthly-totals-row">
                            <Col>
                                {/*<Row>*/}
                                <Col xs={4}><h4>Salary:</h4></Col>
                                <Col xs={8} onClick={() => {this.setState({showModal:true})}}>

                                    <h4 style={{paddingLeft:30}} className="pull-right">
                                        <span className="glyphicon glyphicon-pencil"></span>
                                    </h4>
                                    <h4 className="pull-right">
                                        {this.state.monthlyIncome + ' lv.'}
                                    </h4>
                                </Col>
                                {/*</Row>*/}

                            </Col>
                            <Col><h4>Other income:</h4></Col>
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
                    changeDailyCash ={(monthlyIncome) => {this.changeMonthlyIncome(monthlyIncome)}}
                    cashValue={this.state.monthlyIncome}
                >
                </StatementPeriodDayModal>
            </div>
        );
    }

}