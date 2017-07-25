import React, { Component } from 'react';


export default class OneBio extends Component {

  constructor(props) {
    super(props);
    const { bio } = props;
    this.state = {
      bio,
    };
    this.styles = {
      bioContent: {
        fontFamily: 'Josefin Slab',
      },
    };
  }

  render() {
    const { bio } = this.state;
    return (
      <div className="bio_container">
        <h3>Bio: </h3>
        <p>{bio}</p>
      </div>
    );
  }
}
