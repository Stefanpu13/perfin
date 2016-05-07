/**
 * Created by stefan on 3/19/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Input } from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'
import {Col} from  'react-bootstrap'
import StatementPeriodDayModalDropdown from './statementPeriodDayModalDropdown'

function isValidCashValue(input) {
    return input !== null && isNaN(+input) === false && input >= 0;
}

export default class StatementPeriodDayModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cashValue: undefined,
            cashInputStyle: 'success',
            selectedSubcategory: 'other'
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            cashValue: newProps.cashValue,
            cashInputStyle: 'success',
            selectedSubcategory: 'other'
        });
    }

    changeCashValue(event) {
        var cashStyle = isValidCashValue(event.target.value) ? 'success' : 'error';
        this.setState({cashValue: event.target.value, cashInputStyle: cashStyle});
    }

    changeSelectedSubcategory(selectedSubcategory) {
        this.setState({selectedSubcategory: selectedSubcategory});
    }

    isSubmitButtonDisabled() {
        var disabled = this.state.cashInputStyle !== 'success' ? true : false;
        return disabled;
    }

    changeCash(event) {
        if (isValidCashValue(this.state.cashValue)) {
            this.props.changeCash(this.state.cashValue, this.state.selectedSubcategory);
        }

        event.preventDefault();
    }

    render() {
        return (
            <Modal
                show={this.props.showModal}
                onHide={() => this.props.closeModal()}>
                <Modal.Body>
                    <form onSubmit={(e) => this.changeCash(e)}>
                        <Input type="text" ref="currentValueInput"
                               value={this.state.cashValue}
                               onChange={(event) => this.changeCashValue(event)}
                               bsStyle={this.state.cashInputStyle}
                               hasFeedback/>
                        <StatementPeriodDayModalDropdown showSubcategoryInput={this.props.showSubcategoryInput}
                                                         category={this.props.category}
                                                         selectedSubcategory={this.state.selectedSubcategory}
                                                         changeSelectedSubcategory=
                                                             {this.changeSelectedSubcategory.bind(this)}
                        >
                        </StatementPeriodDayModalDropdown>


                        <Button type="submit" disabled={this.isSubmitButtonDisabled()}>
                            <span className="glyphicon glyphicon-ok"></span>
                        </Button>
                        <Button type="button" onClick={() => this.props.closeModal()}>
                            <span className="glyphicon glyphicon-remove"></span>
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}