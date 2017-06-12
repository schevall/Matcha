import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Logout from './Logout';

class Lobby extends Component {


  render() {
    // console.log('in lobby, isLogged = ', isLogged);
    return (
      <div>
        <h2>Suggestions</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loginReducer, messageReducer } = state;
  const { isLogged, loggedUser } = loginReducer;
  const { message, format } = messageReducer;

  return {
    isLogged,
    loggedUser,
    message,
    format,
  };
};

export default connect(mapStateToProps)(Lobby);
