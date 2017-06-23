import * as T from './loginTypes';

function loginRequest(data) {
  return {
    type: T.LOGIN_REQUEST,
    loading: true,
    isLogged: false,
    username: '',
    token: '',
    data,
  };
}

function loginSuccess(data) {
  return {
    type: T.LOGIN_SUCCESS,
    loading: false,
    isLogged: true,
    username: data.username,
    token: data.token,
    data: null,
  };
}

function loginFailure() {
  return {
    type: T.LOGIN_FAILURE,
    loading: false,
    isLogged: false,
    username: '',
    token: '',
    data: null,
  };
}

function logoutRequest(token, username) {
  return {
    type: T.LOGOUT_REQUEST,
    loading: true,
    isLogged: true,
    username,
    token,
    data: null,
  };
}

function logoutSuccess() {
  return {
    type: T.LOGOUT_SUCCESS,
    loading: false,
    isLogged: false,
    username: '',
    token: '',
    data: null,
  };
}


export { loginRequest, loginSuccess, loginFailure, logoutSuccess, logoutRequest };
