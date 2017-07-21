import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UploadPictureComponent from '../Components/UploadPictureComponent.js';
import GalleryDisplayComponent from '../Components/GalleryDisplayComponent.js';

class GalleryContainer extends Component {

  constructor(props) {
    super(props);
    const { username, picturesPath, profilePicturePath } = props;
    const picturesNb = picturesPath.length;
    this.state = {
      username,
      picturesNb,
      picturesPath,
      profilePicturePath,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { picturesPath, profilePicturePath } = nextProps;
    const picturesNb = picturesPath.length;
    console.log('in galery', nextProps);
    this.setState({
      picturesNb,
      picturesPath,
      profilePicturePath,
    });
  }

  handleonImageDrop = (files) => {
    this.props.handleImageUpload(files[0]);
  }

  render() {
    const { picturesPath, username, picturesNb } = this.state;
    return (
      <div className="gallery_container">
        Gallery
        <div className="gallery_display_container">
          <GalleryDisplayComponent
            picturesPath={picturesPath}
            picturesNb={picturesNb}
            username={username}
            handleRemove={this.props.handleRemove}
            handleFavorite={this.props.handleFavorite}
          />
          <UploadPictureComponent
            picturesNb={picturesNb}
            handleonImageDrop={this.handleonImageDrop}
          />
        </div>
      </div>
    );
  }
}

GalleryContainer.PropTypes = {
  username: PropTypes.string,
  picturesPath: PropTypes.arrayOf(String),
  profilePicturePath: PropTypes.string,
};

GalleryContainer.defaultProps = {
  picturesPath: [],
  profilePicturePath: '',
};

export default GalleryContainer;
