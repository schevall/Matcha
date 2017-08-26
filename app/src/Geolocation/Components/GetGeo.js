import axios from 'axios';

const GetGeo = async (address) => {
  const key = 'AIzaSyBzraJ9crCly5WvgMOzFdNZwqvIvAVLP30';
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
  return axios(url, 'GET').then(({ data }) => {
    const { location } = data.results[0].geometry;
    const geo = `${location.lat},${location.lng}`;
    return geo;
  });
};

export default GetGeo;
