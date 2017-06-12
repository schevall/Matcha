import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { errorSendingBound, messageSendingBound } from '../Actions/messageBound';

class SignUpForm extends Component {

  state = {
    message: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { login, password, password1, email } = this;
    axios.post('/api/signup', {
      email: email.value.trim(),
      login: login.value.trim(),
      password: password.value.trim(),
      password1: password1.value.trim(),
    })
    .then(({ data }) => {
      if (data.error) {
        this.props.dispatch(errorSendingBound(data.error));
      } else {
        this.props.dispatch(messageSendingBound('Your account has been created, please activate your email'));
      }
    });
  }

  render() {
    const { message } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Welcome to Matcha</h2><br />
        <a href="/signin">To login</a>
        <h3>Subcription</h3><br />
        <input type="login" ref={(login) => { this.login = login; }} placeholder="Login*" required="true" /><br />
        <input defaultValue="Patata11" type="password" ref={(password) => { this.password = password; }} placeholder="passwd*" required="true" />Patata11<br />
        <input defaultValue="Patata11" type="password" ref={(password1) => { this.password1 = password1; }} placeholder="Confirm your passwd*" required="true" /><br />
        <input defaultValue="michel@trouville.com" type="email" ref={(email) => { this.email = email; }} placeholder="email adress*" required="true" /><br />
        <input type="submit" value="Signup" className="btn btn-primary" /><br />
        <p>{ message }</p>
      </form>
    );
  }
}

SignUpForm.PropTypes = {
  message: PropTypes.string,
  format: PropTypes.string,
};

SignUpForm.defaultProps = {
  message: '',
  format: '',
};

const mapStateToProps = (state) => {
  const { messageReducer } = state;
  const { message, format } = messageReducer;

  return {
    message,
    format,
  };
};

export default connect(mapStateToProps)(SignUpForm);
