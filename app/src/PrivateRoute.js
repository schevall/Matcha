import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import { Redirect, Route } from 'react-router-dom';
import { logoutBound } from './Actions/Login/loginBound.js';

const CheckExpToken = (isLogged, rest) => {
  console.log('PRIV', rest);
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

const PrivateRoute = ({ component: Component, isLogged, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      CheckExpToken(isLogged, rest) ? (
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
