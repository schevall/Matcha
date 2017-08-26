import axios from 'axios';

const GetAddress = async (geo) => {
  const key = 'AIzaSyBzraJ9crCly5WvgMOzFdNZwqvIvAVLP30';
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geo}&key=${key}`;
  return axios(url, 'GET').then(({ data }) => {
    const address = data.results[0].formatted_address;
    return address;
  });
};

export default GetAddress;
