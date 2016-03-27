/**
 * Created by stefan on 3/2/2016.
 */
import jq from 'jquery'
window.$ = window.jQuery = jq;
//var bootstrap = require('bootstrap');
//import bootstrap from 'bootstrap';


import React from 'react'
import ReactDOM from 'react-dom'
import AccountingPeriod from './statementPeriod'
//import HomePage from './homePage'
import  HomePageContainer from './containers/homePageContainer'

class Root extends React.Component {
    render() {
        //return <StatementPeriod accountingDays={[2, 4, 6]}></StatementPeriod>
       // return <StatementPeriod></StatementPeriod>
       return <HomePageContainer></HomePageContainer>
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('container')
);