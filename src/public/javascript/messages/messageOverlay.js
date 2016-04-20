/**
 * Created by stefan on 4/20/2016.
 */

/**
 * Created by stefan on 3/10/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Overlay} from 'react-bootstrap'


export default class MessageOverlay extends React.Component {
    render() {
        const style = {
            position: 'absolute',
            backgroundColor: '#EEE',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
            border: '1px solid #CCC',
            borderRadius: 3,
            marginLeft: -5,
            marginTop: 5,
            padding: 10
        };

        return <Overlay
            show={this.props.show}
            placement="left"
            container={this}
        >
            <div style={style}>
                <strong>{this.props.message}</strong>
                <span className="glyphicon glyphicon-remove-circle text-center"
                      onClick={this.props.hideMessage}>
                </span>
            </div>
        </Overlay>
    }
}