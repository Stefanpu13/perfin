/**
 * Created by stefan on 3/10/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { Input } from 'react-bootstrap'
import {ButtonInput } from 'react-bootstrap'
import { Row} from 'react-bootstrap'
import {Col } from 'react-bootstrap'
import { Grid } from 'react-bootstrap'
import { Overlay } from 'react-bootstrap'
import { Popover } from 'react-bootstrap'
import  AccountingDayOverlay  from './accountingDayOverlay'
//import { Modal } from 'react-bootstrap'

export default class AccountingDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false};
    }

    open(index) {
        this.setState({show: true, dayIndex:index});
    }

    handleChange(i, event) {
        this.props.handleUserChange(event.target.value || 0, i);
    }

    render() {
        return (
            <Grid>
                {this.props.accountingDates.map((d, i) => {
                        return <Row className="show-grid" key={i}>
                            {/*Date col*/}
                            <Col xs={5}>
                                {moment(this.props.startDate).add(i, 'd').format('MM/DD/YYYY')}
                            </Col>
                            {/*Value col*/}
                            <Col id={('col-' + i)} xs={5} ref={'target-' + i} >
                                <span >{d}</span>
                            </Col>
                            {/*Edit value*/}
                            <Col xs={1} className="text-center"
                                 onClick={this.open.bind(this, i)}>

                                {/*<Button bsStyle="default">Holy guacamole!</Button>*/}
                                <span className="glyphicon glyphicon-pencil"></span>

                            </Col>
                            {/*Add new value*/}
                            <Col className=
                                     "text-center" xs={1}>
                                <span className="glyphicon glyphicon-plus text-center"></span>
                            </Col>

                        </Row>

                    }
                )}
                {/*<Overlay container={this}
                 show={this.state.show}
                 target={ () => ReactDOM.findDOMNode(this.refs['target-' + this.state.dayIndex])}
                 placement="bottom"
                 >
                 <div className="overlay-input">
                 <Input type="text" ref="input"
                 value={this.props.accountingDates[this.state.dayIndex]}
                 onChange={this.handleChange.bind(this, this.state.dayIndex, event)} />
                 </div>
                 </Overlay>*/}
                <AccountingDayOverlay dayIndex={this.state.dayIndex}
                                      show={this.state.show}
                                      accountingDates={this.props.accountingDates}
                >
                </AccountingDayOverlay>
            </Grid>

        );

    }
}