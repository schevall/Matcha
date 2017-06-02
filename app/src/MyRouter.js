import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import List from './Components/List';


const MyRouter = (props) => {
  const { store } = props;
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" store={store} component={App} />
          <Route exact path="/api/users" component={List} />
        </Switch>
      </div>
    </Router>
  );
};


export default MyRouter;
