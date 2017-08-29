import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './CSS/style.css';
import './CSS/profile_style.css';

import PrivateRoute from './PrivateRoute.js';
import NotificationsSystem from './Navbar/NotificationSystem.js';
import SignInContainer from './Sign/SignIn.js';
import SignUpContainer from './Sign/SignUp.js';
import Activation from './Sign/Activation.js';
import Init from './init.js';
import App from './App.js';


const MyRouter = () => (
  <Router>
    <div>
      <NotificationsSystem />
      <Switch>
        <Route exact path="/signup" component={SignUpContainer} />
        <Route exact path="/signin" component={SignInContainer} />
        <Route exact path="/activation" component={Activation} />
        <Route exact path="/init" component={Init} />
        <PrivateRoute path="*" component={App} />
      </Switch>
    </div>
  </Router>
);

export default MyRouter;
