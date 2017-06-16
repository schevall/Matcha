import * as T from '../Actions/SigninError/SigninErrorTypes';

const initial = {
  SigninErrorObject: null,
};

function signinErrorReducer(state = initial, action) {
  // console.log('in SigninReducer, action = ', action);
  // console.log('in SigninReducer, state = ', state);
  switch (action.type) {
    case T.SIGNIN_ERROR:
      return { ...state,
        SigninErrorObject: action.SigninErrorObject,
      };
    case T.ERASE_SIGNIN_ERROR:
      return { ...state,
        SigninErrorObject: null,
      };
    default:
      return state;
  }
}

export default signinErrorReducer;
