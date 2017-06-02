import React, { Component } from 'react';
import axios from 'axios';

class SignUpForm extends Component {

  state = {
    message: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { login, password, password1, email } = this;
    const url = '/api/signup';
    axios.post(url, {
      email: email.value.trim(),
      login: login.value.trim(),
      password: password.value.trim(),
      password1: password1.value.trim(),
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
        Subcription<br />
        <input type="login" ref={(login) => { this.login = login; }} placeholder="Login*" required="true" /><br />
        <input defaultValue="Patata11" type="password" ref={(password) => { this.password = password; }} placeholder="passwd*" required="true" />Patate11<br />
        <input defaultValue="Patata11" type="password" ref={(password1) => { this.password1 = password1; }} placeholder="Confirm your passwd*" required="true" /><br />
        <input defaultValue="michel@trouville.com" type="email" ref={(email) => { this.email = email; }} placeholder="email adress*" required="true" /><br />
        <input type="submit" value="Signup" className="btn btn-primary" /><br />
        <p>{ message }</p>
      </form>
    );
  }
}

export default SignUpForm;
