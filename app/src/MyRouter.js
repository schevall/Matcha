import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './CSS/style.css';
import './CSS/profile_style.css';

import PrivateRoute from './PrivateRoute.js';
import NotificationsSystem from './Components/NotificationSystem.js';
import SignInContainer from './Containers/SignInContainer.js';
import SignUpContainer from './Containers/SignUpContainer.js';
import Activation from './Containers/Activation.js';
import App from './App.js';


const MyRouter = () => (
  <Router>
    <div>
      <NotificationsSystem />
      <Switch>
        <Route exact path="/signup" component={SignUpContainer} />
        <Route exact path="/signin" component={SignInContainer} />
        <Route exact path="/activation" component={Activation} />
        <PrivateRoute path="*" component={App} />
      </Switch>
    </div>
  </Router>
);

export default MyRouter;
