import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { loginBound } from '../Actions/Login/loginBound.js';
import { SigninErrorEraseBound } from '../Actions/SigninError/SigninErrorBound.js';
import SignInComponent from '../Components/SignInComponent.js';

class SignInContainer extends Component {

  state = {
    username: '',
    password: '',
    errorUsername: '',
    errorPassword: '',
  };

  componentWillReceiveProps(nextProps) {
    // console.log('in SIGNIN CONT, NEXT PROPS =', nextProps);
    if (nextProps.SigninErrorObject) {
      this.setState({
        [nextProps.SigninErrorObject.error]: nextProps.SigninErrorObject.message,
      });
    }
  }

  requestLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const input = { username, password };
    this.props.dispatch(SigninErrorEraseBound());
    this.props.dispatch(loginBound(input));
  };

  saveState = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'username' && this.state.errorusername) {
      this.setState({ errorUsername: '' });
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
        <div className="signin_container">
          <Link to="/signup">To Signup</Link>
          <br />
          <Link to="/activation">To Activation</Link>
          <SignInComponent
            username={this.state.username}
            password={this.state.password}
            errorUsername={this.state.errorUsername}
            errorPassword={this.state.errorPassword}
            handleChange={this.saveState}
            handleSubmit={this.requestLogin}
          />
        </div>
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
