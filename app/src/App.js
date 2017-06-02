import React from 'react';
import './App.css';
import SignUpForm from './Components/SignUp';
import SignInForm from './Components/SignIn';
import MessageBar from './Components/Message_bar';

const App = props => (
  <div className="App">
    <MessageBar {...props.store} />
    <h2>Welcome to Matcha</h2>
    <a href="/api/users" >go to user</a>
    <SignUpForm />
    <SignInForm />
  </div>
);

export default App;
