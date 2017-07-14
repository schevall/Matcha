import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import rootReducer from './Reducers/indexReducer.js';
import MyRouter from './MyRouter';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ));

injectTapEventPlugin();

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <MyRouter />
    </Provider>
  </MuiThemeProvider>,
document.getElementById('root'),
);
