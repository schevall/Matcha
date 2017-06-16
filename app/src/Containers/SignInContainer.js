import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { loginBound } from '../Actions/Login/loginBound.js';
import { SigninErrorEraseBound } from '../Actions/SigninError/SigninErrorBound.js';
import SignInComponent from '../Components/SignInComponent.js';

injectTapEventPlugin();

class SignInContainer extends Component {

  state = {
    login: '',
    password: '',
    errorLogin: '',
    errorPassword: '',
  };

  componentWillReceiveProps(nextProps) {
    // console.log('in SIGNIN CONT, NEXT PROPS =', nextProps);
    if (nextProps.SigninErrorObject) {
      this.setState({
        [nextProps.SigninErrorObject.field]: nextProps.SigninErrorObject.error,
      });
    }
  }

  requestLogin = (e) => {
    e.preventDefault();
    const { login, password } = this.state;
    const input = { login, password };
    this.props.dispatch(SigninErrorEraseBound());
    this.props.dispatch(loginBound(input));
  };

  saveState = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'login' && this.state.errorLogin) {
      this.setState({ errorLogin: '' });
    }
    if (e.target.name === 'password' && this.state.errorPassword) {
      this.setState({ errorPassword: '' });
    }
  }

  render() {
    const { isLogged } = this.props;
    return (
      isLogged ?
        <Redirect to="/" /> :
        <SignInComponent
          login={this.state.login}
          password={this.state.password}
          errorLogin={this.state.errorLogin}
          errorPassword={this.state.errorPassword}
          handleChange={this.saveState}
          handleSubmit={this.requestLogin}
        />
    );
  }
}

SignInContainer.PropTypes = {
  isLogged: PropTypes.bool,
  SigninErrorObject: PropTypes.Object,
};

SignInContainer.defaultProps = {
  isLogged: false,
  SigninErrorObject: null,
};

const mapStateToProps = ({
  loginReducer: { isLogged },
  signinErrorReducer: { SigninErrorObject },
}) => ({
  isLogged,
  SigninErrorObject,
});


export default connect(mapStateToProps)(SignInContainer);
