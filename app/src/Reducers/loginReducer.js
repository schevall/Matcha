import * as T from '../Actions/Login/loginTypes';

const initial = {
  loading: false,
  isLogged: !!localStorage.getItem('access_token'),
  username: localStorage.getItem('username'),
  token: localStorage.getItem('access_token'),
  profilePicturePath: localStorage.getItem('profilePicturePath'),
  data: null,
};

function loginReducer(state = initial, action) {
  // console.log('in loginreducer, action = ', action);
  // console.log('return in login reducer state = ', state);
  switch (action.type) {
    case T.LOGIN_REQUEST:
      return { ...state,
        loading: true,
        isLogged: false,
        token: '',
        username: '',
        data: action.data,
      };
    case T.LOGIN_FAILURE:
      return { ...state,
        loading: false,
        isLogged: false,
        token: '',
        username: '',
        data: null,
      };
    case T.LOGIN_SUCCESS:
      return { ...state,
        loading: false,
        isLogged: true,
        token: action.token,
        username: action.username,
        profilePicturePath: action.profilePicturePath,
        data: null,
      };
    case T.NEWFAVPIC:
      return { ...state,
        loading: false,
        isLogged: true,
        token: action.token,
        username: action.username,
        profilePicturePath: action.profilePicturePath,
        data: null,
      };
    case T.LOGOUT:
      return { ...state,
        loading: false,
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
