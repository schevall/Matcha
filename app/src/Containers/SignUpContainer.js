import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notifications from 'react-notification-system-redux';

import SignupComponent from '../Components/SignUpComponent.js';
import myGeolocate from '../ToolBox/myGeolocate.js';

class SignUpContainer extends Component {

  state = {
    username: 'schevall',
    password: 'Patata11',
    password2: 'Patata11',
    email: 'sim.chvll@gmail.com',
    birthDate: null,
    gender: '',
    genderValue: 'Male',
    errorUsername: '',
    errorPassword: '',
    errorPassword2: '',
    errorEmail: '',
    errorEmail2: '',
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
        const title = 'Your account has been created, you may now login, remember to activate your account';
        this.props.dispatch(
          Notifications.success({ title }),
        );
      }
    });
  }

  saveState = (e) => {
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
      errorBirthDate: '',
      birthDate: date,
    });
  }

  handleGenderChange = (event, index, value) => {
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
  notifications: PropTypes.object,
};

SignUpContainer.defaultProps = {
  notifications: null,
};

const mapStateToProps = ({
  notifications,
}) => ({
  notifications,
});

export default connect(mapStateToProps)(SignUpContainer);
