import * as T from './loginTypes';

function loginRequest(data) {
  return {
    type: T.LOGIN_REQUEST,
    loading: true,
    isLogged: false,
    data,
  };
}

function loginSuccess(data) {
  return {
    type: T.LOGIN_SUCCESS,
    loading: false,
    isLogged: true,
    loggedUser: data.loggedUser,
    token: data.token,
  };
}

function loginFailure(response) {
  return {
    type: T.LOGIN_FAILURE,
    loading: false,
    isLogged: false,
    response,
  };
}

export { loginRequest, loginSuccess, loginFailure };
