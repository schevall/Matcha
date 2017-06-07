import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import loginBound from '../Actions/loginBound';

class SignInForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    const { login, password } = this;
    const input = { login: login.value, password: password.value };
    this.props.dispatch(loginBound(input));
    console.log('after first dispatch in signinform, state = ', this.props);
  };

  render() {
    const { isLogged } = this.props;
    if (isLogged) return (<Redirect to="/lobby" />);
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Connection</h3><br />
        <h4><a href="/">Back to Signup</a></h4>
        <input type="login" ref={(login) => { this.login = login; }} placeholder="Login*" required="true" /><br />
        <input type="password" ref={(password) => { this.password = password; }} placeholder="password*" required="true" /><br />
        <input type="submit" value="Signin" /> <br />
        {this.props.response && <p>{ this.props.response }</p>}
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const { loginreducer } = state;
  const { isLogged, response } = loginreducer;

  return {
    isLogged,
    response,
  };
};


export default connect(mapStateToProps)(SignInForm);
