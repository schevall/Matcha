import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutBound } from '../Actions/Login/loginBound';

class Logout extends Component {

  onLogout = () => {
    // console.log('in lougout event this props = ', this.props);
    this.props.dispatch(logoutBound('You have been successfully disconnected'));
  };

  render() {
    // console.log('in lougout this props = ', this.props);
    return (
      <radio onClick={this.onLogout} >Logout</radio>
    );
  }
}

const mapStateToProps = ({
  messageReducer: { message, format },
}) => ({
  message,
  format,
});

export default connect(mapStateToProps)(Logout);
