import axios from 'axios';
import Notifications from 'react-notification-system-redux';
import * as A from './loginAction';
import { SigninErrorSending } from '../SigninError/SigninErrorAction';
import secureAxios from '../../secureAxios.js';


export function loginBound(input) {
  return (dispatch) => {
    dispatch(A.loginRequest(input));
    return axios.post('/api/signin', input)
      .then(({ data }) => {
        if (data.error) {
          dispatch(A.loginFailure());
          dispatch(SigninErrorSending(data));
        } else {
          console.log('log success resp', data);
          localStorage.setItem('access_token', data.token);
          localStorage.setItem('username', data.username);
          dispatch(A.loginSuccess(data));
          dispatch(Notifications.success({ title: `Hello ${data.username}, you are connected` }));
        }
      })
      .catch(err => console.log('error in login proccess: ', err));
  };
}

export function logout(title) {
  return (dispatch) => {
    dispatch(A.logout());
    secureAxios('/users/logout', 'GET')
      .then(({ data }) => {
        if (data.error) {
          localStorage.setItem('access_token', '');
          localStorage.setItem('username', '');
          dispatch(Notifications.error({ title: data.message }));
        } else {
          localStorage.setItem('access_token', '');
          localStorage.setItem('username', '');
          console.log('LOUGOUT RESP', title);
          dispatch(Notifications.success({ title }));
        }
      });
  };
}
