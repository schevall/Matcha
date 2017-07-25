import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './CSS/style.css';
import './CSS/profile_style.css';

import PrivateRoute from './PrivateRoute.js';
import NavBar from './Components/NavBar.js';
import NotificationsSystem from './Components/NotificationSystem.js';
import SignInContainer from './Containers/SignInContainer.js';
import SignUpContainer from './Containers/SignUpContainer.js';
import Activation from './Containers/Activation.js';
import Lobby from './Components/Lobby.js';
import MyProfile from './Containers/MyProfile.js';
import OneProfile from './Containers/OneProfile.js';


const MyRouter = (props) => {
  console.log('in router props = ', props);
  const { isLogged } = props;
  const { SigninErrorObject } = props;
  return (
    <Router>
      <div>
        <NavBar isLogged={isLogged} />
        <NotificationsSystem props={props} />
        <Switch>
          <Route exact path="/signup" component={SignUpContainer} />
          <Route exact path="/signin" isLogged={isLogged} SigninErrorObject={SigninErrorObject} component={SignInContainer} />
          <Route exact path="/activation" component={Activation} />
          <PrivateRoute exact path="/myprofile" props={props} component={MyProfile} />
          <PrivateRoute exact path="/profile/:username" props={props} component={OneProfile} />
          <PrivateRoute exact path="/" props={props} component={Lobby} />
          <Route path="*" isLogged={isLogged} SigninErrorObject={SigninErrorObject} component={SignInContainer} />
        </Switch>
      </div>
    </Router>
  );
};

MyRouter.PropTypes = {
  username: PropTypes.string,
  isLogged: PropTypes.bool,
  SigninErrorObject: PropTypes.Object,
  notifications: PropTypes.Object,
};

const mapStateToProps = ({
  loginReducer: { isLogged },
  signinErrorReducer: { SigninErrorObject },
}) => ({
  isLogged,
  SigninErrorObject,
});


export default connect(mapStateToProps)(MyRouter);
