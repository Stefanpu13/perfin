/**
 * Created by stefan on 3/26/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Col} from 'react-bootstrap'

export default class TotalsIncomeType extends React.Component {
    constructor(props) {
        super(props);
    }

    showTotalsModal(){
        this.props.showTotalsModal(this.props.incomeType);
    }

    getIncome(income, incomeType) {
        return ((income && income[incomeType]) || 0);
    }

    render() {
        return (
            <Col>
                <Col xs={4}><h4>{this.props.incomeType}:</h4></Col>
                <Col xs={8} onClick={this.showTotalsModal.bind(this)}>
                    <h4 style={{paddingLeft:30}} className="pull-right">
                        <span className="glyphicon glyphicon-pencil"></span>
                    </h4>
                    <h4 className="pull-right">
                        {this.getIncome(this.props.income, this.props.incomeType) + ' lv.'}
                    </h4>
                </Col>
            </Col>
        );
    }
}