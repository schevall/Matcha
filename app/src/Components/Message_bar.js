import React, { Component } from 'react';

class MessageBar extends Component {

  state = {
    message: '',
  }

  render() {
    console.log(this.props)
    const { message } = this.props;
    return <p>{ message }</p>;
  }
}

export default MessageBar;
