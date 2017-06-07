import { combineReducers } from 'redux';
import * as T from '../Actions/loginTypes';

const initial = {
  type: null,
  loading: null,
  isLogged: false,
  data: null,
};

function loginreducer(state = initial, action) {
  console.log('in reducer, action = ', action);
  switch (action.type) {
    case T.LOGIN_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        isLogged: false,
        data: action.data,
      });
    case T.LOGIN_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        isLogged: false,
        response: action.response,
      });
    case T.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        isLogged: true,
        token: action.token,
        loggedUser: action.loggedUser,
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  loginreducer,
});

export default rootReducer;
