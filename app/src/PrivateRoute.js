import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import { Redirect, Route } from 'react-router-dom';
import { logoutBound } from './Actions/Login/loginBound.js';

const CheckExpToken = (isLogged, rest) => {
  let title = null;
  if (!isLogged) {
    this.path = '/signin';
    title = 'Please login to access our website';
    rest.dispatch(Notifications.error({ title }));
    return false;
  }
  const token = localStorage.getItem('access_token');
  if (!token || token === 'undefined') {
    this.path = '/signin';
    title = 'No token provided, to connect, please sign in';
    rest.dispatch(Notifications.error({ title }));
    return false;
  }
  try {
    const decode = jwtDecode(token);
    if (Date.now() / 1000 > decode.exp) {
      title = 'Your session has expired, please reconnect';
      this.path = '/signin';
      rest.dispatch(logoutBound({ title }));
      return false;
    }
    return true;
  } catch (e) {
    this.path = '/signin';
    title = 'Your session has expired, please reconnect';
    rest.dispatch(logoutBound({ title }));
    return false;
  }
};

const CheckNavAuth = (Component, isLogged, activated, rest) => {
  let title = null;
  if (!CheckExpToken(isLogged, rest)) return false;
  if (!activated && rest.path !== '/myprofile') {
    console.log('pirv', activated);
    this.path = '/myprofile';
    title = 'Please provide the activation key to enjoy our features =)';
    rest.dispatch(Notifications.error({ title }));
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component, isLogged, activated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      CheckNavAuth(Component, isLogged, activated, rest) ? (
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
  loginReducer: { isLogged, username, activated },
}) => ({
  isLogged,
  username,
  activated,
});

export default connect(mapStateToProps)(PrivateRoute);
