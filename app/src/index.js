import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import loginReducer from './Reducers/loginReducer';
import messageReducer from './Reducers/messageReducer';
import MyRouter from './MyRouter';

const rootReducer = combineReducers({
  loginReducer,
  messageReducer,
});

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ));
  
render(
  <Provider store={store}>
    <MyRouter />
  </Provider>,
document.getElementById('root'),
);
