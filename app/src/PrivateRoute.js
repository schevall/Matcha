import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { logoutBound } from './Actions/Login/loginBound.js';
import { errorGeneralSendingBound } from './Actions/MessageGeneral/messageGeneralBound.js';

const CheckExpToken = (isLogged, rest) => {
  console.log('in private route rest = ', rest);
  console.log('in private route isLogged = ', isLogged);
  if (!isLogged) {
    rest.dispatch(errorGeneralSendingBound('Please login before trying to access lobby'));
    return false;
  }
  const token = localStorage.getItem('access_token');
  if (!token || token === 'undefined') {
    rest.dispatch(errorGeneralSendingBound('No token provided to connect, please sign in'));
    return false;
  }
  // console.log('token in private route', token);
  try {
    const decode = jwtDecode(token);
    // console.log('in CheckExpToken, token = ', decode);
    // console.log('in CheckExpToken, date now = ', Date.now() / 1000);
    if (Date.now() / 1000 > decode.exp) {
      rest.dispatch(logoutBound('Please connect again, your session has expired'));
      return false;
    }
    return true;
  } catch (e) {
    rest.dispatch(logoutBound('Please connect again, your session has expired'));
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
        <Redirect to={{
          pathname: '/signin',
          state: { from: props.location } }}
        />
        ))}
  />
);

const mapStateToProps = ({
  loginReducer: { isLogged, username },
  messageReducer: { message, format },
}) => ({
  isLogged,
  username,
  message,
  format,
});

export default connect(mapStateToProps)(PrivateRoute);
