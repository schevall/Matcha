import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Lobby extends Component {


  render() {
    const { username } = this.props;
    // console.log('in lobby, isLogged = ', isLogged);
    return (
      <div>
        <h2>Salut {username}</h2>
      </div>
    );
  }
}

const mapStateToProps = ({
  loginReducer: { isLogged, username },
  messageReducer: { message, format },
}) => ({
  isLogged,
  username,
  message,
  format,
});

export default connect(mapStateToProps)(Lobby);
