/**
 * Created by stefan on 3/25/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import StatementPeriod from './statementPeriod'
import {Navbar} from 'react-bootstrap'
import {Input} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import Loader from 'react-loader'

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 1,
            createStatementButtonDisabled: true,
            selectedStatementPeriodDay: undefined
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            //createStatementButtonDisabled: newProps.displayedStatementPeriod !== null
            createStatementButtonDisabled: StatementPeriod.exists(newProps.displayedStatementPeriod)
        });
    }

    checkCreateStatementPeriodButton(statementPeriodDay) {
        //buttons is enabled when date is from current period and date is not start date
        let dayIsInCurrentPeriod = this.props.displayedStatementPeriod.statementPeriodDays
            .some(spd => {
                return spd._id === statementPeriodDay._id;
            });
        let dayIsStartDay =
            this.props.displayedStatementPeriod.statementPeriodDays[0]._id === statementPeriodDay._id;

        let buttonIsDisabled = !this.props.displayedStatementPeriod.isLastPeriod ||
            !dayIsInCurrentPeriod || dayIsStartDay;


        return buttonIsDisabled;
    }

    selectStatementPeriodDay(statementPeriodDay) {
        let createStatementButtonDisabled = this.checkCreateStatementPeriodButton(statementPeriodDay);

        this.setState({
            selectedStatementPeriodDay: statementPeriodDay,
            createStatementButtonDisabled: createStatementButtonDisabled
        });
    }

    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand> <a href="#">Home</a> </Navbar.Brand> <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Form pullLeft>
                        <Button onClick={() =>
                        this.props.getPreviousStatementPeriod()}>
                            <span className="glyphicon glyphicon-arrow-left"></span>
                            {' '}
                            <span>Previous</span>
                        </Button>
                        {' '}
                        <Button onClick={() =>
                        this.props.getNextStatementPeriod()}>
                            <span>Next</span>
                            {' '}
                            <span className="glyphicon glyphicon-arrow-right"></span>
                        </Button>
                    </Navbar.Form>


                    <Navbar.Collapse>
                        <Navbar.Form pullRight>
                            <Input type="text" placeholder="Search income statement"/>
                            {' '}
                            <Button onClick={() =>
                            this.props.createNewStatementPeriod(this.state.selectedStatementPeriodDay)}
                                    disabled={this.state.createStatementButtonDisabled}
                            >Create Statement Period</Button>
                        </Navbar.Form>
                    </Navbar.Collapse>
                </Navbar>
                <Loader loaded={this.props.loaded}>
                    <StatementPeriod {...this.props}
                        selectStatementPeriodDay={this.selectStatementPeriodDay.bind(this)}
                    >
                    </StatementPeriod>
                </Loader>
            </div>
        )
    }

}
