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

export default class StatementPeriodTotals extends React.Component {
    constructor(props) {
        super(props);
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
                    <Row className="monthly-totals-row">
                        <Col xs={12} sm={6} className="monthly-totals-divider">

                            <Col xs={4}><h3>Income</h3></Col>
                            <Col >
                                <h3 className="pull-right">
                                    {"Income lv. "}
                                </h3>
                            </Col>
                        </Col>
                        <Col xs={12} sm={6}><h3>Expenses</h3></Col>
                    </Row>
                    <Row className="monthly-totals-row">
                        <Col sm={6} className="monthly-totals-divider">
                            <Col><h4>Salary:</h4></Col>
                            <Col><h4>Other income:</h4></Col>
                        </Col>
                        <Col sm={6}>
                            {/*<Col><h4>Expenses: </h4></Col>*/}

                        </Col>
                    </Row>
                </Panel>
            </div>
        );
    }

}