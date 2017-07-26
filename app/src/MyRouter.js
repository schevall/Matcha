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
  return (
    <Router>
      <div>
        <NavBar />
        <NotificationsSystem />
        <Switch>
          <Route exact path="/signup" component={SignUpContainer} />
          <Route exact path="/signin" component={SignInContainer} />
          <Route exact path="/activation" component={Activation} />
          <PrivateRoute exact path="/myprofile" component={MyProfile} />
          <PrivateRoute exact path="/profile/:username" component={OneProfile} />
          <PrivateRoute exact path="/" component={Lobby} />
          <Route path="*" component={SignInContainer} />
        </Switch>
      </div>
    </Router>
  );
};

MyRouter.PropTypes = {
  isLogged: PropTypes.bool,
  SigninErrorObject: PropTypes.Object,
  notifications: PropTypes.Object,
};

const mapStateToProps = ({
  loginReducer: { isLogged },
  signinErrorReducer: { SigninErrorObject },
  notifications,
}) => ({
  isLogged,
  SigninErrorObject,
  notifications,
});


export default connect(mapStateToProps)(MyRouter);
