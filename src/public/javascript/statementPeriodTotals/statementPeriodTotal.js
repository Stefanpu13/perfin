/**
 * Created by stefan on 5/7/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'

export default class StatementPeriodTotal extends React.Component {
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
        let style = {color: this.props.total < 0?'red':''};
        return (
            <Col xs={12}>
                <Row className="monthly-totals-row">
                    <Col xs={12}>

                        <h3 className="pull-right" style={style}>
                            {this.props.total + ' lv.'}
                        </h3>
                        <h3 className="pull-right" style={{paddingRight:20}}>
                            {'Totals: '}
                        </h3>
                    </Col>
                </Row>
            </Col>
        );
    }
}