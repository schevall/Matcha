const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

const myGeolocate = (geo) => {
  navigator.geolocation.getCurrentPosition((position) => {
    geo.pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  }, error, options);
};

export default { myGeolocate };
