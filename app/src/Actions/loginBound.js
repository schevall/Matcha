import axios from 'axios';
import * as A from './loginAction';

function loginBound(input) {
  return (dispatch) => {
    dispatch(A.loginRequest(input));
    return axios.post('/api/signin', input)
      .then(({ data }) => {
        if (data.success === false) {
          dispatch(A.loginFailure(data.response));
        } else {
          localStorage.token = data.setItem('token');
          localStorage.loggedUser = data.setItem('loggedUser');
          dispatch(A.loginSuccess(data));
        }
      })
      .catch(err => console.log('error in login proccess: ', err));
  };
}

export default loginBound;
