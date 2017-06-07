import React, { Component } from 'react';
import { connect } from 'react-redux';

class Lobby extends Component {

  render() {
    console.log('props in lobby= ', this.props);
    const { loggedUser } = this.props;
    return (
      <div>
        <h2>Connected</h2>
        <h3>Hello {loggedUser}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loginreducer } = state;
  const { isLogged, loggedUser } = loginreducer;

  return {
    isLogged,
    loggedUser,
  };
};

export default connect(mapStateToProps)(Lobby);
