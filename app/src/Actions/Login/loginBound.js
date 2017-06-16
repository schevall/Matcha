import axios from 'axios';
import * as A from './loginAction';
import { messageGeneralSending } from '../MessageGeneral/messageGeneralAction';
import { SigninErrorSending } from '../SigninError/SigninErrorAction';

function loginBound(input) {
  return (dispatch) => {
    dispatch(A.loginRequest(input));
    return axios.post('/api/signin', input)
      .then(({ data }) => {
        if (data.error) {
          dispatch(A.loginFailure());
          // console.log('in lOGIN BOUND data = ', data);
          dispatch(SigninErrorSending(data));
        } else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('loggedUser', data.loggedUser);
          dispatch(A.loginSuccess(data));
          dispatch(messageGeneralSending(`Hello ${data.loggedUser}, you are connected`));
        }
      })
      .catch(err => console.log('error in login proccess: ', err));
  };
}

function logoutBound(input) {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const loggedUser = localStorage.getItem('loggedUser');
    // console.log('in logoutBound, token = ', token);
    // console.log('in logoutBound, loggedUser = ', loggedUser);
    dispatch(A.logoutRequest(token, loggedUser));
    localStorage.setItem('token', '');
    localStorage.setItem('loggedUser', '');
    dispatch(A.logoutSuccess());
    dispatch(messageGeneralSending(input));
  };
}

export { loginBound, logoutBound };
