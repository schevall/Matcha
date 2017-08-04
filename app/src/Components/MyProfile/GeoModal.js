import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class GeoModal extends Component {
  constructor(props) {
    super(props);
    const { geo, address, key } = props;
    this.state = {
      showModal: false,
      geo,
      address,
      key,
    };
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  render() {
    const { address, geo } = this.state;
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
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            There gonne be a map someday
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
