import axios from 'axios';
import * as A from './loginAction';

function loginBound(input) {
  console.log('in login bound input = ', input);
  return (dispatch) => {
    dispatch(A.loginRequest(input));
    console.log('in login bound after request input = ', input);
    return axios.post('/api/signin', input)
      .then(({ data }) => {
        if (data.success === false) {
          dispatch(A.loginFailure(data.response));
          console.log('in login bound after dispatch false data = ', data);
        } else {
          dispatch(A.loginSuccess(data));
        }
      })
      .catch(err => console.log('error in login ', err));
  };
}

export default loginBound;
