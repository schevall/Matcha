import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Lobby extends Component {


  render() {
    const { loggedUser } = this.props;
    // console.log('in lobby, isLogged = ', isLogged);
    return (
      <div>
        <h2>Salut {loggedUser}</h2>
      </div>
    );
  }
}

const mapStateToProps = ({
  loginReducer: { isLogged, loggedUser },
  messageReducer: { message, format },
}) => ({
  isLogged,
  loggedUser,
  message,
  format,
});

export default connect(mapStateToProps)(Lobby);
