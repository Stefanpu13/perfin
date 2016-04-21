/**
 * Created by stefan on 3/19/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Input } from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'
import {Col} from  'react-bootstrap'
import {DropdownButton} from 'react-bootstrap'
import {MenuItem} from 'react-bootstrap'

function isValidExpensesValue(input) {
    return input !== null && isNaN(+input) === false && input >= 0;
}

export default class AccountingDayModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentDailyExpenses: undefined, expensesInputStyle: 'success'};
    }

    componentWillReceiveProps(newProps) {
        this.setState({currentDailyExpenses: newProps.currentDailyExpenses, expensesInputStyle: 'success'});
    }

    //componentDidUpdate() {
    //    if(this.refs && this.refs.currentValueInput) {
    //        this.refs.currentValueInput.getInputDOMNode().focus()
    //    }
    //}

    changeExpensesValue(event) {
        var expensesStyle = isValidExpensesValue(event.target.value) ? 'success' : 'error';
        this.setState({currentDailyExpenses: event.target.value, expensesInputStyle: expensesStyle});
    }

    isSubmitButtonDisabled() {
        var disabled = this.state.expensesInputStyle !== 'success' ? true : false;
        return disabled;
    }


    onClose() {
        this.props.onClose();
    }

    onFormSubmit(event) {
        if (isValidExpensesValue(this.state.currentDailyExpenses)) {
            this.props.changeDailyExpenses(this.state.currentDailyExpenses);
        }

        event.preventDefault();
    }


    render() {
        var displayStyle = this.props.showSubcategoryInput?
            '' : 'none';
        var styles = {display: displayStyle};

        return (
            <Modal
                show={this.props.showModal}
                onHide={() => this.onClose()}>
                <Modal.Body>
                    <form onSubmit={(e) => this.onFormSubmit(e)}>
                        <Input type="text" ref="currentValueInput"
                               value={this.state.currentDailyExpenses}
                               onChange={(event) => this.changeExpensesValue(event)}
                               bsStyle={this.state.expensesInputStyle}
                               hasFeedback/>
                        <DropdownButton style={styles} title={"H"} key={11} id={`dropdown-basic-${11}`}>
                            <MenuItem eventKey="1">Action</MenuItem>
                            <MenuItem eventKey="2">Another action</MenuItem>
                            <MenuItem eventKey="3" active>Active Item</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="4">Separated link</MenuItem>
                        </DropdownButton>

                        <Button type="submit" disabled={this.isSubmitButtonDisabled()}>
                            <span className="glyphicon glyphicon-ok"></span>
                        </Button>
                        <Button type="button" onClick={() => this.onClose()}>
                            <span className="glyphicon glyphicon-remove"></span>
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}