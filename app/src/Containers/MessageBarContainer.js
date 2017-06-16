import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageBarComponent from '../Components/MessageBarComponent';

import { eraseGeneralMessageBound } from '../Actions/MessageGeneral/messageGeneralBound';

class MessageBarContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      format: '',
      message: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('in MessageBar, will receive, nextProps = ', nextProps);
    this.setState({
      format: nextProps.messageObject.format,
      message: nextProps.messageObject.message,
    });
    if (nextProps.messageObject.message) {
      setTimeout(() => {
        this.props.dispatch(eraseGeneralMessageBound());
        clearTimeout();
      }, 4000);
    }
  }

  render() {
    return (
      <MessageBarComponent
        message={this.state.message}
        format={this.state.format}
      />
    );
  }
}

const mapStateToProps = ({
  messageReducer: { messageObject },
}) => ({
  messageObject,
});

export default connect(mapStateToProps)(MessageBarContainer);
