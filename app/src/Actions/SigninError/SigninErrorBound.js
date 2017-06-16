import * as A from './SigninErrorAction.js';

function SigninErrorSendingBound(SigninErrorObject) {
  // console.log('in messageSendingBound messageObject = ', messageObject);
  return (dispatch) => {
    dispatch(A.SigninErrorSending(SigninErrorObject));
  };
}

function SigninErrorEraseBound() {
  // console.log('in messageSendingBound messageObject = ', messageObject);
  return (dispatch) => {
    dispatch(A.SigninErrorErase());
  };
}

export { SigninErrorSendingBound, SigninErrorEraseBound };
