/**
 * Created by stefan on 5/7/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'

export default class TotalsExpenses extends React.Component {
    constructor(props) {
        super(props);
    }

    static getDailyTotalExpenses(statementPeriodDay) {
        let dayTotalExpenses = 0;
        for (let category in statementPeriodDay.expenses) {
            for (let subcategory in statementPeriodDay.expenses[category]) {
                dayTotalExpenses += statementPeriodDay.expenses[category][subcategory];
            }
        }

        return dayTotalExpenses;
    }

    static getTotalExpenses(statementPeriod) {
        let totalExpenses = statementPeriod.statementPeriodDays.reduce((sum, statementPeriodDay) => {
            return sum + TotalsExpenses.getDailyTotalExpenses(statementPeriodDay);
        }, 0);

        return totalExpenses;
    }

    render() {
        return (
            <Col xs={12} sm={6}>
                <Row className="monthly-totals-row">
                    <Col xs={4}><h3>Expenses</h3></Col>
                    <Col >
                        <h3 className="pull-right" style={{color:'red'}}>
                            {TotalsExpenses.getTotalExpenses(
                                this.props.displayedStatementPeriod) + ' lv.'}
                        </h3>
                    </Col>
                </Row>
            </Col>
        );
    }
}