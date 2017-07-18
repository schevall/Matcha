import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import { Redirect, Route } from 'react-router-dom';
import { logoutBound } from './Actions/Login/loginBound.js';

const CheckExpToken = (isLogged, rest) => {
  this.path = '/signin';
  let title = null;
  if (!isLogged) {
    title = 'Please login before trying to access lobby';
    rest.dispatch(Notifications.error({ title }));
    return false;
  }
  const token = localStorage.getItem('access_token');
  if (!token || token === 'undefined') {
    title = 'No token provided to connect, please sign in';
    rest.dispatch(Notifications.error({ title }));
    return false;
  }
  try {
    const decode = jwtDecode(token);
    if (Date.now() / 1000 > decode.exp) {
      title = 'Your session has expired, please reconnect';
      rest.dispatch(logoutBound({ title }));
      return false;
    }
    return true;
  } catch (e) {
    title = 'Your session has expired, please reconnect';
    rest.dispatch(logoutBound({ title }));
    return false;
  }
};

const CheckNavAuth = (Component, isLogged, activated, completion, rest) => {
  let title = null;
  if (!CheckExpToken(isLogged, rest)) return false;
  if (!activated) {
    this.path = '/myprofile';
    title = 'Please provide the activation key to enjoy our features =)';
    rest.dispatch(Notifications.error({ title }));
    return false;
  }
  if (completion < 80) {
    this.path = '/myprofile';
    title = 'In order to provide a service of quality, please complete your profile';
    rest.dispatch(Notifications.error({ title }));
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component, isLogged, activated, completion, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      CheckNavAuth(Component, isLogged, activated, completion, rest) ? (
        <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: this.path,
              state: { from: props.location } }}
          />
        ))}
  />
);

const mapStateToProps = ({
  loginReducer: { isLogged, username },
}) => ({
  isLogged,
  username,
});

export default connect(mapStateToProps)(PrivateRoute);
