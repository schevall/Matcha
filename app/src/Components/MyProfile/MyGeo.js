import React, { Component } from 'react';
import axios from 'axios';
import CircularProgress from 'material-ui/CircularProgress';
import GoogleMapReact from 'google-map-react';
import GeoModal from './GeoModal.js'

const style = { fontSize: '20px', color: 'red' };
const Marker = () => <i style={style} className="glyphicon glyphicon-map-marker" />;

export default class MyGeo extends Component {

  constructor(props) {
    super(props);
    const { geo } = props;
    this.state = { geo, address: '' };
    this.key = 'AIzaSyBzraJ9crCly5WvgMOzFdNZwqvIvAVLP30';
  }

  componentWillMount() {
    const { geo } = this.state;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geo}&key=${this.key}`;
    axios(url, 'GET')
      .then(({ data }) => {
        this.setState({ address: data.results[0].formatted_address });
      });
  }

  render() {
    if (!this.state.address) return (<CircularProgress />);
    const { geo, address } = this.state;
    return (
      <GeoModal />
    );
  }
}
