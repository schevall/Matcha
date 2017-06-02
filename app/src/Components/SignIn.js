import React, { Component } from 'react';
import axios from 'axios';

class SignInForm extends Component {

  state = {
    message: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { login, password } = this;
    const url = '/api/signin';
    axios.post(url, {
      login: login.value,
      password: password.value,
    })
    .then(({ data }) => {
      if (data.success === true) {
        this.setState({ message: data.message });
      } else {
        this.setState({ message: data.message });
      }
    });
  }

  render() {
    const { message } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
          Connection<br />
        <input type="login" ref={(login) => { this.login = login; }} placeholder="Login*" required="true" /><br />
        <input type="password" ref={(password) => { this.password = password; }} placeholder="password*" required="true" /><br />
        <input type="submit" value="Signin" className="btn btn-primary" /> <br />
        <p>{ message }</p>
      </form>
    );
  }
}

export default SignInForm;
