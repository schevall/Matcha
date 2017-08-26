import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Geolocate from './Geolocation.js';

export default class GeoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  handleNewAddress = (newGeo, newAddress) => {
    this.setState({ newGeo, newAddress });
  }

  handleSave = (e) => {
    e.preventDefault();
    const { newGeo, newAddress } = this.state;
    this.props.handleSave(newGeo, newAddress);
    this.close();
  }

  render() {
    const loaded = !!this.state.newGeo;
    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={this.open}
        >
          Geolocate
        </Button>

        <Modal show={this.state.showModal} onHide={this.close} bsSize="lg">
          <Modal.Header closeButton>
            <Modal.Title>Geolocation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Geolocate handleNewAddress={this.handleNewAddress} />
          </Modal.Body>
          <Modal.Footer>
            { loaded ? <Button onClick={this.handleSave}>Save</Button> : null }
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
