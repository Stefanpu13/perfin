/**
 * Created by stefan on 3/2/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import AccountingPeriod from './statementPeriod'
import  HomePageContainer from './containers/homePageContainer'
import MessageOverlay from './messages/messageOverlay'

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false, message: ''};
    }

    onErrorReceived(error) {
        this.setState({show: true, message: error.message});
        // call this method when network/http error is received
    }

    onMessageHidden() {
        this.setState({show: false});
    }

    render() {
        return <div>
            <HomePageContainer
                onErrorReceived={(error) => this.onErrorReceived(error)}>
            </HomePageContainer>
            <MessageOverlay
                show={this.state.show}
                message={this.state.message}
                hideMessage={() => this.onMessageHidden()}>
            </MessageOverlay>
        </div>
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('container')
);