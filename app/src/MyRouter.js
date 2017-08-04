import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './CSS/style.css';
import './CSS/profile_style.css';

import PrivateRoute from './PrivateRoute.js';
import NavBar from './Components/NavBar.js';
import NotificationsSystem from './Components/NotificationSystem.js';
import SignInContainer from './Containers/SignInContainer.js';
import SignUpContainer from './Containers/SignUpContainer.js';
import Activation from './Containers/Activation.js';
import Suggestions from './Containers/Suggestions.js';
import MyProfile from './Containers/MyProfile.js';
import Activity from './Containers/Activity.js';
import OneProfile from './Containers/OneProfile.js';


const MyRouter = (props) => {
  console.log('in router props = ', props);
  return (
    <Router>
      <div>
        <PrivateRoute component={NavBar} />
        <NotificationsSystem />
        <Switch>
          <Route exact path="/signup" component={SignUpContainer} />
          <Route exact path="/signin" component={SignInContainer} />
          <Route exact path="/activation" component={Activation} />
          <PrivateRoute exact path="/" component={Suggestions} />
          <PrivateRoute exact path="/myprofile" component={MyProfile} />
          <PrivateRoute exact path="/activity" component={Activity} />
          <PrivateRoute exact path="/profile/:username" component={OneProfile} />
          <Route path="*" component={SignInContainer} />
        </Switch>
      </div>
    </Router>
  );
};

export default MyRouter;
