/**
 * Created by stefan on 3/2/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import  HomePageContainer from './containers/homePageContainer'
import MessageOverlay from './messages/messageOverlay'
import 'whatwg-fetch'

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false, message: '', messageClassName: 'error-message-style error-message-layout'};
    }

    showReceivedError(errorMessage) {
        this.setState({
            show: true,
            message: errorMessage,
            messageClassName: 'error-message-style error-message-layout'
        });
    }

    showReceivedWarning(warning) {
        this.setState({
            show: true,
            message: warning.message,
            messageClassName: 'warning-message-style warning-message-layout'
        });
    }

    hideMessage() {
        this.setState({show: false});
    }

    render() {
        return <div>
            <HomePageContainer
                showReceivedError={error => this.showReceivedError(error)}
                showReceivedWarning={warning => this.showReceivedWarning(warning)}>
            </HomePageContainer>
            <MessageOverlay
                show={this.state.show}
                message={this.state.message}
                messageClassName={this.state.messageClassName}
                hideMessage={() => this.hideMessage()}>
            </MessageOverlay>
        </div>
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('container')
);