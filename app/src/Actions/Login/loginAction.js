import * as T from './loginTypes';

export function loginRequest(data) {
  return {
    type: T.LOGIN_REQUEST,
    activated: null,
    loading: true,
    isLogged: false,
    username: '',
    access_token: '',
    data,
  };
}

export function loginSuccess(data) {
  return {
    type: T.LOGIN_SUCCESS,
    activated: data.activated,
    loading: false,
    isLogged: true,
    username: data.username,
    access_token: data.token,
    data: null,
  };
}

export function activationSuccess(data) {
  return {
    type: T.ACTIVATION_SUCCESS,
    activated: data.activated,
    loading: false,
    isLogged: true,
    username: data.username,
    access_token: data.token,
    data: null,
  };
}

export function loginFailure() {
  return {
    type: T.LOGIN_FAILURE,
    activated: null,
    loading: false,
    isLogged: false,
    username: '',
    access_token: '',
    data: null,
  };
}

export function logoutRequest(accessToken, username) {
  return {
    type: T.LOGOUT_REQUEST,
    activated: null,
    loading: true,
    isLogged: true,
    username,
    access_token: accessToken,
    data: null,
  };
}

export function logoutSuccess() {
  return {
    type: T.LOGOUT_SUCCESS,
    activated: null,
    loading: false,
    isLogged: false,
    username: '',
    access_token: '',
    data: null,
  };
}
