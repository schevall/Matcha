import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OneGalleryDisplay from '../Components/OneProfile/OneGalleryDisplay.js';

export default class OneGallery extends Component {

  constructor(props) {
    super(props);
    const { picturesPath, username } = props;
    const picturesNb = picturesPath.length;
    this.state = {
      username,
      picturesNb,
      picturesPath,
    };
  }

  render() {
    const { picturesPath, picturesNb, username } = this.state;
    return (
      <div className="gallery_container">
        Gallery
        <div className="gallery_display_container">
          <OneGalleryDisplay
            picturesPath={picturesPath}
            picturesNb={picturesNb}
            username={username}
          />
        </div>
      </div>
    );
  }
}

OneGallery.PropTypes = {
  username: PropTypes.string,
  picturesPath: PropTypes.arrayOf(String),
};

OneGallery.defaultProps = {
  picturesPath: [],
};
