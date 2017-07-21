import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute.js';

import NavBar from './Components/NavBar.js';
import NotificationsSystem from './Components/NotificationSystem.js';
import SignInContainer from './Containers/SignInContainer.js';
import SignUpContainer from './Containers/SignUpContainer.js';
import Lobby from './Components/Lobby.js';
import MyProfileContainer from './Containers/MyProfileContainer.js';


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
          <PrivateRoute exact path="/myprofile" props={props} component={MyProfileContainer} />
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
  activated: PropTypes.bool,
  SigninErrorObject: PropTypes.Object,
  notifications: PropTypes.Object,
};

MyRouter.defaultProps = {
  isLogged: false,
  activated: false,
  SigninErrorObject: null,
};

const mapStateToProps = ({
  loginReducer: { isLogged, activated },
  signinErrorReducer: { SigninErrorObject },
}) => ({
  isLogged,
  activated,
  SigninErrorObject,
});


export default connect(mapStateToProps)(MyRouter);
