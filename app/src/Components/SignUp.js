import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { errorGeneralSendingBound, messageGeneralSendingBound } from '../Actions/MessageGeneral/messageGeneralBound';

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
        this.props.dispatch(errorGeneralSendingBound(data.error));
      } else {
        this.props.dispatch(messageGeneralSendingBound('Your account has been created, please activate your email'));
      }
    });
  }

  render() {
    const { message } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Welcome to Matcha</h3><br />
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

const mapStateToProps = ({
  messageReducer: { message, format },
}) => ({
  message,
  format,
});

export default connect(mapStateToProps)(SignUpForm);
