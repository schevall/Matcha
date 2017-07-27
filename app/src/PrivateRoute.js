import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { logout } from './Actions/Login/loginBound.js';

const CheckExpToken = (isLogged, rest) => {
  let title = null;
  if (!isLogged) {
    title = 'Please login to access our website';
    rest.dispatch(logout(title));
    return false;
  }
  const token = localStorage.getItem('access_token');
  if (!token || token === 'undefined') {
    title = 'No token provided, to connect, please sign in';
    rest.dispatch(logout(title));
    return false;
  }
  try {
    const decode = jwtDecode(token);
    if (Date.now() / 1000 > decode.exp) {
      title = 'Your session has expired, please reconnect';
      rest.dispatch(logout(title));
      return false;
    }
    return true;
  } catch (e) {
    title = 'Your session has expired, please reconnect';
    rest.dispatch(logout(title));
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
          <Redirect to="/signin" />
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
