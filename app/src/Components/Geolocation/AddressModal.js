import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import NewAddress from './GeoNewAddress.js';
import GetGeo from './GetGeo.js';

export default class AddressModal extends Component {
  constructor(props) {
    super(props);
    const { geo } = props;
    this.state = {
      showModal: false,
      loaded: false,
      geo,
    };
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  handleNewAddress = (newAddress) => {
    this.setState({ loaded: true });
    GetGeo(newAddress).then((newGeo) => {
      this.setState({ newGeo, newAddress });
    });
  }

  handleSave = (e) => {
    e.preventDefault();
    const { newGeo, newAddress } = this.state;
    this.props.handleSave(newGeo, newAddress);
    this.close();
  }


  render() {
    const { geo, loaded } = this.state;
    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={this.open}
        >
          Change address
        </Button>

        <Modal show={this.state.showModal} onHide={this.close} bsSize="lg">
          <Modal.Header closeButton>
            <Modal.Title>Type an address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewAddress geo={geo} handleNewAddress={this.handleNewAddress} />
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
