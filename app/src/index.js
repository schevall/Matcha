import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './Reducers/loginReducer';
import MyRouter from './MyRouter';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

render(
  <Provider store={store}>
    <MyRouter />
  </Provider>,
document.getElementById('root'),
);
