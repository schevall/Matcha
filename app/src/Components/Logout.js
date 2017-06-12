import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutBound } from '../Actions/loginBound';

class Logout extends Component {

  handleLogout = (event) => {
    event.preventDefault();
    // console.log('in lougout event this props = ', this.props);
    this.props.dispatch(logoutBound('You have been successfully disconnected'));
  };

  render() {
    // console.log('in lougout this props = ', this.props);
    return (
      <button onClick={this.handleLogout}>Logout</button>
    );
  }
}

const mapStateToProps = (state) => {
  const { messageReducer } = state;
  const { message, format } = messageReducer;

  return {
    message,
    format,
  };
};

export default connect(mapStateToProps)(Logout);
