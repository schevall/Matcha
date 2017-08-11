import React, { Component } from 'react';

import {
  withGoogleMap,
  GoogleMap,
} from 'react-google-maps';

/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 */
const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 50, lng: 2 }}
  />
));

export default class MapContainer extends Component {

  render() {
    console.log('IN GOOGLE');
    return (
      <SimpleMapExampleGoogleMap
        containerElement={
          <div style={{ height: `60vh` }} />
        }
        mapElement={
          <div style={{ height: `55vh` }} />
        }
      />
    );
  }
}
