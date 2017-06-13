import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loginBound } from '../Actions/loginBound';

class SignInForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    const { login, password } = this;
    const input = { login: login.value, password: password.value };
    this.props.dispatch(loginBound(input));
  };

  render() {
    const { isLogged } = this.props;
    console.log('in signin, this props = ', this.props);
    if (isLogged) return (<Redirect to="/" />);
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Connection</h3>
        <h4><a href="/signup">Back to Signup</a></h4>
        <h4><a href="/authtest">to authtest</a></h4>
        <h4><a href="/">to lobby</a></h4>
        <input type="login" ref={(login) => { this.login = login; }} placeholder="Login*" required="true" /><br />
        <input type="password" ref={(password) => { this.password = password; }} placeholder="password*" required="true" /><br />
        <input type="submit" value="Signin" /> <br />
      </form>
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


export default connect(mapStateToProps)(SignInForm);
