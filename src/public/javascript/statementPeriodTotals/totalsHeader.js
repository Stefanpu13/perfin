/**
 * Created by stefan on 3/26/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import moment from 'moment'


export default class TotalsHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let daysLength = this.props.statementPeriodDays.length;
        return (
                <Row> <Col sm={4}>Income statement</Col>
                    <Col sm={4}>
                        {"Start Date: " +
                        moment(this.props.statementPeriodDays[0].day)
                            .format("MM/DD/YYYY")}
                    </Col>
                    <Col sm={4}>
                        {"End Date: " +
                        moment(this.props.statementPeriodDays[daysLength - 1].day)
                            .format("MM/DD/YYYY")}
                    </Col>
                </Row>
        );
    }
}