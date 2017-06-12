import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import NavBar from './Components/NavBar';
import List from './Components/List';
import SignUpForm from './Components/SignUp';
import SignInForm from './Components/SignIn';
import authtest from './Components/authtest';
import Lobby from './Components/Lobby';
import Suggestions from './Components/Suggestions';
import MessageBar from './Components/MessageBar';


const MyRouter = (props) => {
  console.log('in router props = ', props);
  const { loggedUser, isLogged } = props;
  const { message, format } = props;
  return (
    <Router>
      <div>
        <MessageBar message={message} format={format} />
        <NavBar isLogged={isLogged} />
        <Switch>
          <Route path="/authtest" loggedUser={loggedUser} component={authtest} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/signin" component={SignInForm} />
          <Route exact path="/api/users" component={List} />
          <PrivateRoute exact path="/" props={props} component={Lobby} />
          <PrivateRoute exact path="/suggestions" props={props} component={Suggestions} />
        </Switch>
      </div>
    </Router>
  );
};

MyRouter.PropTypes = {
  loggedUser: PropTypes.string,
  isLogged: PropTypes.bool,
  message: PropTypes.string,
  format: PropTypes.string,
};

MyRouter.defaultProps = {
  loggedUser: '',
  isLogged: false,
  message: '',
  format: '',
};

const mapStateToProps = (state) => {
  // console.log('in router, State = ', state);
  const { loginReducer, messageReducer } = state;
  const { loggedUser, isLogged } = loginReducer;
  const { message, format } = messageReducer;

  return {
    loggedUser,
    isLogged,
    message,
    format,
  };
};


export default connect(mapStateToProps)(MyRouter);
