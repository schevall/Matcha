import * as T from './loginTypes';

export function loginRequest(data) {
  return {
    type: T.LOGIN_REQUEST,
    loading: true,
    isLogged: false,
    username: '',
    token: '',
    data,
  };
}

export function loginSuccess(data) {
  return {
    type: T.LOGIN_SUCCESS,
    loading: false,
    isLogged: true,
    username: data.username,
    token: data.token,
    data: null,
  };
}

export function loginFailure() {
  return {
    type: T.LOGIN_FAILURE,
    loading: false,
    isLogged: false,
    username: '',
    token: '',
    data: null,
  };
}

export function logoutRequest(accessToken, username) {
  return {
    type: T.LOGOUT_REQUEST,
    loading: true,
    isLogged: true,
    username,
    token: accessToken,
    data: null,
  };
}

export function logoutSuccess() {
  return {
    type: T.LOGOUT_SUCCESS,
    loading: false,
    isLogged: false,
    username: '',
    token: '',
    data: null,
  };
}
