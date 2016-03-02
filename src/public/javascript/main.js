/**
 * Created by stefan on 3/2/2016.
 */

//var React =  require('react');
//var ReactDOM = require('react-dom');
import React from 'react'
import ReactDOM from 'react-dom'


var Hello = React.createClass({
    render: function() {
        return <div>Hello {this.props.name}</div>;
    }
});

ReactDOM.render(
    <Hello name="World edited 33" />,
    document.getElementById('container')
);