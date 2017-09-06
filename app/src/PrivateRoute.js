import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const CheckExpToken = (isLogged, profilePicturePath, rest) => {
  const token = localStorage.getItem('access_token');
  if (!isLogged || !token || token === 'undefined') {
    return '/signin';
  }
  if (!profilePicturePath && rest.location.pathname !== '/myprofile') {
    return '/myprofile';
  }
  return 'follow';
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
