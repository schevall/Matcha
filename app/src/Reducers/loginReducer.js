import * as T from '../Actions/loginTypes';

const initial = {
  loading: false,
  isLogged: !!localStorage.getItem('token'),
  loggedUser: localStorage.getItem('loggedUser'),
  token: localStorage.getItem('token'),
  data: null,
};

function loginReducer(state = initial, action) {
  // console.log('in loginreducer, action = ', action);
  // console.log('return in login reducer state = ', state);
  switch (action.type) {
    case T.LOGIN_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        isLogged: false,
        token: '',
        loggedUser: '',
        data: action.data,
      });
    case T.LOGIN_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        isLogged: false,
        token: '',
        loggedUser: '',
        data: null,
      });
    case T.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        isLogged: true,
        token: action.token,
        loggedUser: action.loggedUser,
        data: null,
      });
    case T.LOGOUT_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        isLogged: true,
        loggedUser: action.loggedUser,
        token: action.token,
        data: null,
      });
    case T.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        isLogged: false,
        loggedUser: '',
        token: '',
        data: null,
      });
    default:
      return state;
  }
}

export default loginReducer;
