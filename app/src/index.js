import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Reducers/Reducers_index';
import MyRouter from './MyRouter';

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <MyRouter />
  </Provider>,
document.getElementById('root'),
);
