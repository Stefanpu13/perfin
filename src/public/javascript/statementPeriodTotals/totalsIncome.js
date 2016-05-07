/**
 * Created by stefan on 5/7/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'

export default class TotalsIncome extends React.Component {
    constructor(props) {
        super(props);
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
        return (
            <Row className="monthly-totals-row">
                <Col xs={4}><h3>Income</h3></Col>
                <Col >
                    <h3 className="pull-right">
                        {this.getTotalIncome(this.props.income) + ' lv.'}
                    </h3>
                </Col>
            </Row>
        );
    }
}