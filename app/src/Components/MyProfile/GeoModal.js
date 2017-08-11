import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import MapContainer from './MapContainer.js';

export default class GeoModal extends Component {
  constructor(props) {
    super(props);
    const { geo, address, Googlekey } = props;
    const path = `https://maps.googleapis.com/maps/api/js?key=${Googlekey}&`;
    console.log('GEO MODAL', props);
    this.state = {
      showModal: false,
      geo,
      address,
      Googlekey,
      path,
    };
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  initializeMap = () => {
    const { geo } = this.state;
    // const mapOption = { zoom: 8, center: new google.maps.LatLng(geo)}
  }

  render() {
    const { address, geo, path } = this.state;
    return (
      <div>
        <p>Your current address : {address}</p>

        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={this.open}
        >
          Change address
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Current Address: {address}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MapContainer Googlekey={this.state.Googlekey} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
