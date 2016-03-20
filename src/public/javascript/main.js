/**
 * Created by stefan on 3/2/2016.
 */

//var React =  require('react');
//var ReactDOM = require('react-dom');
import jq from 'jquery'
window.$ = window.jQuery = jq;
//var bootstrap = require('bootstrap');
//import bootstrap from 'bootstrap';


import React from 'react'
import ReactDOM from 'react-dom'
import AccountingPeriod from './accountingPeriod'


class Hello extends React.Component {
    render() {
        //return <AccountingPeriod accountingDays={[2, 4, 6]}></AccountingPeriod>
        return <AccountingPeriod></AccountingPeriod>

    }
}
;

//var Hello = React.createClass({
//    render: function() {
//        return <div>Hello {this.props.name}</div>;
//    }
//});

ReactDOM.render(
    <Hello name="World edited a"/>,
    document.getElementById('container')
);