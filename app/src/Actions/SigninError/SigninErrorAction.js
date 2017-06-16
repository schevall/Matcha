import * as T from './SigninErrorTypes';

function SigninErrorSending(SigninErrorObject) {
  return {
    type: T.SIGNIN_ERROR,
    SigninErrorObject,
  };
}

function SigninErrorErase() {
  return {
    type: T.ERASE_SIGNIN_ERROR,
  };
}

export { SigninErrorSending, SigninErrorErase };
