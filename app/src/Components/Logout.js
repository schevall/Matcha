import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutBound } from '../Actions/Login/loginBound';

class Logout extends Component {

  onLogout = () => {
    // console.log('in lougout event this props = ', this.props);
    this.props.dispatch(logoutBound({ title: 'You have been successfully disconnected' }));
  };

  render() {
    // console.log('in lougout this props = ', this.props);
    return (
      <ol className="nav-item glyphicon glyphicon-log-out" onClick={this.onLogout}></ol>
    );
  }
}

const mapStateToProps = ({
  notifications,
}) => ({
  notifications,
});

export default connect(mapStateToProps)(Logout);
