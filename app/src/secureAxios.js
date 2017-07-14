import axios from 'axios';

const secureAxios = (destination, method, data = {}, headers = {}) => {
  // console.log('in secure axios, destination = ', destination);
  // console.log('in secure axios, method = ', method);
  // console.log('in secure axios, data = ', data);
  const token = localStorage.getItem('access_token') || null;
  const username = localStorage.getItem('username') || null;
  const fulldest = `/api${destination}`;
  const config = Object.assign({}, { url: fulldest }, { method }, { headers, data });
  config.headers = { token, username };
  // console.log('in secure axios, config = ', config);

  if (!token) { return Promise.reject(new Error('No token in secureaxios!')); }
  if (!username) { return Promise.reject(new Error('No user in secureaxios!')); }

  return axios(config).then((response) => {
    // console.log('in secureAxios resp = ', response);
    return response;
  });
};

export default secureAxios;
