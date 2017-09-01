import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../Actions/Login/loginBound';

class Logout extends Component {

  onLogout = () => {
    this.props.dispatch(logout('You have been successfully disconnected'));
  };

  render() {
    return (
      <Link to="/signin" style={this.props.style} className="nav-item glyphicon glyphicon-log-out" onClick={this.onLogout} />
    );
  }
}
export default connect()(Logout);
