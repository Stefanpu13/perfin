/**
 * Created by stefan on 3/25/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import StatementPeriod from './statementPeriod'
import {Tabs} from 'react-bootstrap'
import {Tab} from 'react-bootstrap'
import {Nav} from 'react-bootstrap'
import  {NavItem} from 'react-bootstrap'
import {Navbar} from 'react-bootstrap'
import {Input} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import Loader from 'react-loader'

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 1,
            createStatementButtonDisabled: true
        };
    }

    componentWillReceiveProps() {
        this.setState({
            createStatementButtonDisabled: !this.props.currentStatementPeriod
        });
    }

    render() {
        //return (<StatementPeriod ></StatementPeriod>);
        return (
            <div>
                <Navbar>
                    <Navbar.Header> {/*<Nav bsStyle="tabs" activeKey={this.state.active} onSelect={(selectedKey) => this.handleSelect(selectedKey)}> <NavItem eventKey={1}> Home </NavItem> </Nav>*/}
                        <Navbar.Brand> <a href="#">Home</a> </Navbar.Brand> <Navbar.Toggle /> </Navbar.Header>
                    <Navbar.Collapse>
                        <Navbar.Form pullRight>
                            <Input type="text" placeholder="Search income statement"/>
                            {' '}
                            <Button onClick={() => {}}
                                    disabled={this.state.createStatementButtonDisabled}
                            >Create Statement Period</Button>
                            {' '}
                            <Button >End Statement period</Button>
                        </Navbar.Form>
                    </Navbar.Collapse>
                </Navbar>
                <Loader loaded={this.props.loaded}>
                    <StatementPeriod {...this.props} >
                    </StatementPeriod>
                </Loader>
            </div>
        )
    }

}
