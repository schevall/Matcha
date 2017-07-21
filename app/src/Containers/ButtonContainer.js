import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';

class GalleryContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activated: props.button,
    };
  }

  render() {
    const { activated } = this.state;
    return (
      !activated ? null :
      <div className="profile_action_container">
        <Button>Like</Button>
        <Button bsStyle="success">Chat</Button>
        <Button bsStyle="warning">Block</Button>
        <Button bsStyle="danger">Report</Button>
      </div>
    );
  }
}

export default GalleryContainer;
