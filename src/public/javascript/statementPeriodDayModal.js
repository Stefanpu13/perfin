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

function isValidExpensesValue(input) {
    return input !== null && isNaN(+input) === false && input >= 0;
}

export default class StatementPeriodDayModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDailyExpenses: undefined,
            expensesInputStyle: 'success',
            selectedSubcategory: 'other'
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            currentDailyExpenses: newProps.currentDailyExpenses,
            expensesInputStyle: 'success',
            selectedSubcategory: 'other'
        });
    }

    onChangeExpensesValue(event) {
        var expensesStyle = isValidExpensesValue(event.target.value) ? 'success' : 'error';
        this.setState({currentDailyExpenses: event.target.value, expensesInputStyle: expensesStyle});
    }

    onChangeSelectedSubcategory(selectedSubcategory) {
        this.setState({selectedSubcategory: selectedSubcategory});
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
        return (
            <Modal
                show={this.props.showModal}
                onHide={() => this.onClose()}>
                <Modal.Body>
                    <form onSubmit={(e) => this.onFormSubmit(e)}>
                        <Input type="text" ref="currentValueInput"
                               value={this.state.currentDailyExpenses}
                               onChange={(event) => this.onChangeExpensesValue(event)}
                               bsStyle={this.state.expensesInputStyle}
                               hasFeedback/>
                        <StatementPeriodDayModalDropdown showSubcategoryInput={this.props.showSubcategoryInput}
                                                         category={this.props.category}
                                                         selectedSubcategory={this.state.selectedSubcategory}
                                                         onChangeSelectedSubcategory=
                                                             {this.onChangeSelectedSubcategory.bind(this)}
                        >
                        </StatementPeriodDayModalDropdown>


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