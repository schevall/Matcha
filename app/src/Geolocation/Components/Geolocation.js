import canUseDOM from 'can-use-dom';

import React, { Component } from 'react';

import {
  withGoogleMap,
  GoogleMap,
  InfoWindow,
} from 'react-google-maps/lib';

import GetAddress from './GetAddress.js';

const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure('Your browser doesn\'t support geolocation.');
    },
  })
);

const GeolocationExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    center={props.center}
  >
    {props.center && (
      <InfoWindow position={props.center}>
        <div>{props.content}</div>
      </InfoWindow>
    )}
  </GoogleMap>
));

export default class Geolocate extends Component {

  state = {
    center: null,
    content: null,
  };

  componentDidMount() {
    geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return;
      }
      const { latitude, longitude } = position.coords;
      const geo = `${latitude},${longitude}`;
      GetAddress(geo).then((address) => {
        this.props.handleNewAddress(geo, address);
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          content: address,
        });
      });
    }, (reason) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: 45,
          lng: 2,
        },
        content: `Error: The Geolocation service failed (${reason}).`,
      });
    });
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  isUnmounted = false;

  render() {
    return (
      <GeolocationExampleGoogleMap
        containerElement={
          <div style={{ height: '70vh' }} />
        }
        mapElement={
          <div style={{ height: '70vh' }} />
        }
        center={this.state.center}
        content={this.state.content}
      />
    );
  }
}
