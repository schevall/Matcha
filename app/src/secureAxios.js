import axios from 'axios';

const secureAxios = (destination, method, data = {}, headers = {}) => {
  const token = localStorage.getItem('access_token') || null;
  const username = localStorage.getItem('username') || null;
  const fulldest = `/api${destination}`;
  const config = Object.assign({}, { url: fulldest }, { method }, { headers, data });
  config.headers = { token, username };

  if (!token || !username) {
    const message = 'No token or username in secureaxios!';
    localStorage.clear();
    Promise.reject(new Error(message)).then(() => {
    }, () => {
      console.log(message);
    });
  }
  return axios(config).then((response) => {
    if (response.data.error && response.data.error === 'authControl') {
      localStorage.clear();
    }
    return response;
  });
};

export default secureAxios;
