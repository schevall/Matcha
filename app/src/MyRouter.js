import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute.js';

import NavBar from './Components/NavBar.js';
import SignUpForm from './Components/SignUp.js';
import SignInContainer from './Containers/SignInContainer.js';
import Lobby from './Components/Lobby.js';
import MessageBarContainer from './Containers/MessageBarContainer.js';
import ProfileContainer from './Containers/ProfileContainer.js';


const MyRouter = (props) => {
  console.log('in router props = ', props);
  const { username, isLogged } = props;
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
          <PrivateRoute exact path="/profile" props={props} component={ProfileContainer} />
          <Route path="*" isLogged={isLogged} SigninErrorObject={SigninErrorObject} component={SignInContainer} />
        </Switch>
      </div>
    </Router>
  );
};

MyRouter.PropTypes = {
  username: PropTypes.string,
  isLogged: PropTypes.bool,
  messageObject: PropTypes.Object,
  SigninErrorObject: PropTypes.Object,
};

MyRouter.defaultProps = {
  username: '',
  isLogged: false,
  messageObject: null,
};

const mapStateToProps = ({
  loginReducer: { isLogged, username },
  messageReducer: { messageObject },
  signinErrorReducer: { SigninErrorObject },
}) => ({
  isLogged,
  username,
  messageObject,
  SigninErrorObject,
});


export default connect(mapStateToProps)(MyRouter);
