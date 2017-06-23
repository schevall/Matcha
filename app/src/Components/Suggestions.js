import React, { Component } from 'react';
import { connect } from 'react-redux';

class Suggestions extends Component {


  render() {
    return (
      <div>
        <h2>Suggestions</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loginReducer, messageReducer } = state;
  const { isLogged, username } = loginReducer;
  const { message, format } = messageReducer;

  return {
    isLogged,
    username,
    message,
    format,
  };
};

export default connect(mapStateToProps)(Suggestions);
