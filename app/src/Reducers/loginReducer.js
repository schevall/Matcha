import * as T from '../Actions/Login/loginTypes';

const initial = {
  loading: false,
  isLogged: !!localStorage.getItem('access_token'),
  username: localStorage.getItem('username'),
  token: localStorage.getItem('token'),
  data: null,
};

function loginReducer(state = initial, action) {
  // console.log('in loginreducer, action = ', action);
  // console.log('return in login reducer state = ', state);
  switch (action.type) {
    case T.LOGIN_REQUEST:
      return { ...state,
        loading: true,
        activated: null,
        completion: null,
        isLogged: false,
        token: '',
        username: '',
        data: action.data,
      };
    case T.LOGIN_FAILURE:
      return { ...state,
        loading: false,
        activated: null,
        completion: null,
        isLogged: false,
        token: '',
        username: '',
        data: null,
      };
    case T.LOGIN_SUCCESS:
      return { ...state,
        loading: false,
        activated: action.activated,
        completion: action.completion,
        isLogged: true,
        token: action.token,
        username: action.username,
        data: null,
      };
    case T.LOGOUT_REQUEST:
      return { ...state,
        loading: true,
        activated: null,
        completion: null,
        isLogged: true,
        username: action.username,
        token: action.token,
        data: null,
      };
    case T.LOGOUT_SUCCESS:
      return { ...state,
        loading: false,
        activated: null,
        completion: null,
        isLogged: false,
        username: '',
        token: '',
        data: null,
      };
    default:
      return state;
  }
}

export default loginReducer;
