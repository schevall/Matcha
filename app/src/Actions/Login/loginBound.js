import axios from 'axios';
import * as A from './loginAction';
import { messageGeneralSending } from '../MessageGeneral/messageGeneralAction';
import { SigninErrorSending } from '../SigninError/SigninErrorAction';

function loginBound(input) {
  return (dispatch) => {
    dispatch(A.loginRequest(input));
    return axios.post('/api/signin', input)
      .then(({ data }) => {
        console.log('in login bound data', data);
        if (data.error) {
          dispatch(A.loginFailure());
          dispatch(SigninErrorSending(data));
        } else {
          localStorage.setItem('access_token', data.token);
          localStorage.setItem('username', data.username);
          dispatch(A.loginSuccess(data));
          dispatch(messageGeneralSending(`Hello ${data.username}, you are connected`));
        }
      })
      .catch(err => console.log('error in login proccess: ', err));
  };
}

function logoutBound(input) {
  return (dispatch) => {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    // console.log('in logoutBound, token = ', token);
    // console.log('in logoutBound, username = ', username);
    dispatch(A.logoutRequest(token, username));
    localStorage.setItem('access_token', '');
    localStorage.setItem('username', '');
    dispatch(A.logoutSuccess());
    dispatch(messageGeneralSending(input));
  };
}

export { loginBound, logoutBound };