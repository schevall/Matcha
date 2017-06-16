import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import NavBar from './Components/NavBar';
import SignUpForm from './Components/SignUp';
import SignInContainer from './Containers/SignInContainer';
import Lobby from './Components/Lobby';
import Suggestions from './Components/Suggestions';
import MessageBarContainer from './Containers/MessageBarContainer';
import Profile from './Components/Profile';


const MyRouter = (props) => {
  console.log('in router props = ', props);
  const { loggedUser, isLogged } = props;
  const { messageObject } = props;
  const { SigninErrorObject } = props;
  return (
    <Router>
      <div>
        <NavBar isLogged={isLogged} />
        <MessageBarContainer messageObject={messageObject} />
        <Switch>
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/welcome" isLogged={isLogged} SigninErrorObject={SigninErrorObject} component={SignInContainer} />
          <PrivateRoute exact path="/" props={props} component={Lobby} />
          <PrivateRoute exact path="/suggestions" props={props} component={Suggestions} />
          <PrivateRoute exact path="/profile" props={props} component={Profile} />
          <Route path="*" isLogged={isLogged} SigninErrorObject={SigninErrorObject} component={SignInContainer} />
        </Switch>
      </div>
    </Router>
  );
};

MyRouter.PropTypes = {
  loggedUser: PropTypes.string,
  isLogged: PropTypes.bool,
  messageObject: PropTypes.Object,
  SigninErrorObject: PropTypes.Object,
};

MyRouter.defaultProps = {
  loggedUser: '',
  isLogged: false,
  messageObject: null,
};

const mapStateToProps = ({
  loginReducer: { isLogged, loggedUser },
  messageReducer: { messageObject },
  signinErrorReducer: { SigninErrorObject },
}) => ({
  isLogged,
  loggedUser,
  messageObject,
  SigninErrorObject,
});


export default connect(mapStateToProps)(MyRouter);
