import React, { Component } from 'react';
import UploadPictureComponent from '../Components/UploadPictureComponent.js';
import GalleryDisplayComponent from '../Components/GalleryDisplayComponent.js';

class GalleryContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      picturesNb: 0,
      picturesPath: [],
      profilePicturePath: '',
      errorUpload: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.username,
      picturesNb: nextProps.picturesNb,
      picturesPath: nextProps.picturesPath,
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

export default GalleryContainer;
