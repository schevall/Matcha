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
    profilePicturePath: data.profilePicturePath,
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

export function logout() {
  return {
    type: T.LOGOUT,
    loading: false,
    isLogged: false,
    username: '',
    token: '',
    data: null,
  };
}

export function NewfavPic(username, profilePicturePath, token) {
  return {
    type: T.NEWFAVPIC,
    loading: false,
    isLogged: true,
    username,
    token,
    profilePicturePath,
    data: null,
  };
}
