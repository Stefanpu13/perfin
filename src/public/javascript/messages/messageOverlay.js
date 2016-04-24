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
        return <Overlay
            show={this.props.show}
            container={this}
        >
            <div className={'overlay-message ' +  this.props.messageClassName}>
                <strong>{this.props.message}</strong>
                <span className="glyphicon glyphicon-remove-circle text-center"
                      onClick={this.props.hideMessage}>
                </span>
            </div>
        </Overlay>
    }
}