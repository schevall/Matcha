import React from 'react';
import { Switch } from 'react-router-dom';

import './CSS/style.css';
import './CSS/profile_style.css';

import PrivateRoute from './PrivateRoute.js';
import NavBar from './Components/NavBar.js';
import Suggestions from './Suggestions/Suggestions.js';
import MyProfile from './MyProfile/MyProfile.js';
import OneProfile from './OneProfile/OneProfile.js';
import Activity from './Containers/Activity.js';
import Chat from './Chat/Chat.js';
import ChatRoom from './Chat/ChatRoom.js';

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
