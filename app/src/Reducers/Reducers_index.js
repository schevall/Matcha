import { combineReducers } from 'redux';

function test(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const userActions = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  test, userActions,
});

export default rootReducer;
