import * as T from './loginTypes';

function loginRequest(data) {
  return {
    type: T.LOGIN_REQUEST,
    loading: true,
    isLogged: false,
    loggedUser: '',
    token: '',
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
    data: null,
  };
}

function loginFailure() {
  return {
    type: T.LOGIN_FAILURE,
    loading: false,
    isLogged: false,
    loggedUser: '',
    token: '',
    data: null,
  };
}

function logoutRequest(token, loggedUser) {
  return {
    type: T.LOGOUT_REQUEST,
    loading: true,
    isLogged: true,
    loggedUser,
    token,
    data: null,
  };
}

function logoutSuccess() {
  return {
    type: T.LOGOUT_SUCCESS,
    loading: false,
    isLogged: false,
    loggedUser: '',
    token: '',
    data: null,
  };
}


export { loginRequest, loginSuccess, loginFailure, logoutSuccess, logoutRequest };
