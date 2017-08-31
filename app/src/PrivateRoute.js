import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { logout } from './Actions/Login/loginBound.js';

const CheckExpToken = (isLogged, profilePicturePath, rest) => {
  if (!isLogged) {
    rest.dispatch(logout('Please login to access our website'));
    return '/signin';
  }
  const token = localStorage.getItem('access_token');
  if (!token || token === 'undefined') {
    rest.dispatch(logout('No token provided, to connect, please sign in'));
    return '/signin';
  }
  try {
    const decode = jwtDecode(token);
    if (Date.now() / 1000 > decode.exp) {
      rest.dispatch(logout('Your session has expired, please reconnect'));
      return '/signin';
    }
    if (!profilePicturePath && rest.location.pathname !== '/myprofile') {
      return '/myprofile';
    }
    return 'follow';
  } catch (e) {
    rest.dispatch(logout('Your session has expired, please reconnect'));
    return '/signin';
  }
};

const PrivateRoute = ({ component: Component, isLogged, profilePicturePath, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const path = CheckExpToken(isLogged, profilePicturePath, rest);
      return (path === 'follow' ? (<Component {...props} />)
                                : (<Redirect to={path} />
        ));
    }}
  />
);

const mapStateToProps = ({
  loginReducer: { isLogged, username, profilePicturePath },
}) => ({
  profilePicturePath,
  isLogged,
  username,
});

export default connect(mapStateToProps)(PrivateRoute);
