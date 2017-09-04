import * as A from './SigninErrorAction.js';

function SigninErrorSendingBound(SigninErrorObject) {
  return (dispatch) => {
    dispatch(A.SigninErrorSending(SigninErrorObject));
  };
}

function SigninErrorEraseBound() {
  return (dispatch) => {
    dispatch(A.SigninErrorErase());
  };
}

export { SigninErrorSendingBound, SigninErrorEraseBound };
