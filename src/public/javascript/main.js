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

    onErrorReceived(errorMessage) {
        this.setState({
            show: true,
            message: errorMessage,
            messageClassName: 'error-message-style error-message-layout'
        });
    }

    onWarningReceived(warning) {
        this.setState({
            show: true,
            message: warning.message,
            messageClassName: 'warning-message-style warning-message-layout'
        });
    }

    onMessageHidden() {
        this.setState({show: false});
    }

    render() {
        return <div>
            <HomePageContainer
                onErrorReceived={error => this.onErrorReceived(error)}
                onWarningReceived={warning => this.onWarningReceived(warning)}>
            </HomePageContainer>
            <MessageOverlay
                show={this.state.show}
                message={this.state.message}
                messageClassName={this.state.messageClassName}
                hideMessage={() => this.onMessageHidden()}>
            </MessageOverlay>
        </div>
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('container')
);