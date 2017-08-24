import React from 'react';
import { Switch } from 'react-router-dom';

import './CSS/style.css';
import './CSS/profile_style.css';

import PrivateRoute from './PrivateRoute.js';
import NavBar from './Components/NavBar.js';
import Suggestions from './Containers/Suggestions.js';
import MyProfile from './Containers/MyProfile.js';
import OneProfile from './Containers/OneProfile.js';
import Activity from './Containers/Activity.js';
import Chat from './Containers/Chat.js';
import ChatRoom from './Containers/ChatRoom.js';

const App = props => (
  <div>
    <NavBar location={props.location} history={props.history} />
    <Switch>
      <PrivateRoute exact path="/" component={Suggestions} />
      <PrivateRoute exact path="/myprofile" component={MyProfile} />
      <PrivateRoute exact path="/activity" component={Activity} />
      <PrivateRoute exact path="/chat" component={Chat} />
      <PrivateRoute exact path="/chat/:target" component={ChatRoom} />
      <PrivateRoute exact path="/profile/:username" component={OneProfile} />
    </Switch>
  </div>
);

export default App;
