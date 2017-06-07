import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import List from './Components/List';
import SignUpForm from './Components/SignUp';
import SignInForm from './Components/SignIn';
import Lobby from './Components/Lobby';


const MyRouter = (props) => {
  console.log('in router props = ', props);
  const { isLogged, loggedUser } = props;
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/lobby" isLogged={isLogged} loggedUser={loggedUser} component={Lobby} />
          <Route exact path="/" component={SignUpForm} />
          <Route exact path="/login" component={SignInForm} />
          <Route exact path="/api/users" component={List} />
        </Switch>
      </div>
    </Router>
  );
};

MyRouter.propTypes = {
  isLogged: PropTypes.bool,
  loggedUser: PropTypes.string,
};

MyRouter.defaultProps = {
  isLogged: false,
  loggedUser: '',
};

const mapStateToProps = (state) => {
  const { loginreducer } = state;
  const { isLogged, loggedUser } = loginreducer;

  return {
    isLogged,
    loggedUser,
  };
};


export default connect(mapStateToProps)(MyRouter);
