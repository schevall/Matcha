import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../Actions/Login/loginBound';

class Logout extends Component {

  onLogout = () => {
    // console.log('in lougout event this props = ', this.props);
    this.props.dispatch(logout('You have been successfully disconnected'));
  };

  render() {
    // console.log('in lougout this props = ', this.props);
    return (
      <Link to="/signin" className="nav-item glyphicon glyphicon-log-out" onClick={this.onLogout} />
    );
  }
}
export default connect()(Logout);
