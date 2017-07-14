import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { messageGeneralSendingBound } from '../Actions/MessageGeneral/messageGeneralBound';
import SignupComponent from '../Components/SignUpComponent.js';

class SignUpContainer extends Component {

  state = {
    username: '',
    password: '',
    password2: '',
    email: '',
    birthDate: null,
    gender: '',
    genderValue: '',
    errorUsername: '',
    errorPassword: '',
    errorPassword2: '',
    errorEmail: '',
    errorBirthDate: '',
    errorGender: '',
  };

  requestSignup = (event) => {
    event.preventDefault();
    const { username, password, password2, email, birthDate, genderValue } = this.state;

    this.setState({
      errorUsername: '',
      errorPassword: '',
      errorPassword2: '',
      errorEmail: '',
      errorBirthDate: '',
      errorGender: '' });

    console.log('state', this.state);
    return null;
    axios.post('/api/signup', {
      username,
      password,
      password2,
      email,
      birthDate,
      genderValue,
    })
    .then(({ data }) => {
      console.log('signup resp', data);
      if (data.verif.success === false) {
        data.verif.output.forEach((item) => {
          if (item) this.setState({ [item.error]: item.message });
        });
      } else {
        const message = 'Your account has been created, please activate your email';
        this.props.dispatch(messageGeneralSendingBound(message));
      }
    });
  }

  saveState = (e) => {
    console.log(e);
    console.log('save target name', e.target.name);
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    switch (e.target.name) {
      case 'username':
        this.setState({ errorUsername: '' });
        break;
      case 'password':
        this.setState({ errorPassword: '' });
        break;
      case 'password2':
        this.setState({ errorPassword2: '' });
        break;
      case 'email':
        this.setState({ errorEmail: '' });
        break;
      case 'birthDate':
        this.setState({ errorBirthDate: '' });
        break;
      case 'gender':
        this.setState({ errorGender: '' });
        break;
      default:
        return null;
    }
    return null;
  }

  handleDateChange = (event, date) => {
    this.setState({
      birthDate: date,
    });
  }

  handleGenderChange = (event, index, value) => {
    console.log('gender change index', index);
    console.log('gender change vallue', value);
    const genderList = ['Male', 'Female', 'Transgender'];
    this.setState({
      gender: value,
      genderValue: genderList[index],
    });
  }

  render() {
    return (
      <SignupComponent
        username={this.state.username}
        password={this.state.password}
        password2={this.state.password2}
        email={this.state.email}
        birthDate={this.state.birthDate}
        gender={this.state.gender}
        errorUsername={this.state.errorUsername}
        errorPassword={this.state.errorPassword}
        errorPassword2={this.state.errorPassword2}
        errorEmail={this.state.errorEmail}
        errorBirthDate={this.state.errorBirthDate}
        errorGender={this.state.errorGender}
        handleChange={this.saveState}
        handleDateChange={this.handleDateChange}
        handleGenderChange={this.handleGenderChange}
        handleSubmit={this.requestSignup}
      />
    );
  }
}

SignUpContainer.PropTypes = {
  message: PropTypes.string,
  format: PropTypes.string,
};

SignUpContainer.defaultProps = {
  message: '',
  format: '',
};

const mapStateToProps = ({
  messageReducer: { message, format },
}) => ({
  message,
  format,
});

export default connect(mapStateToProps)(SignUpContainer);
