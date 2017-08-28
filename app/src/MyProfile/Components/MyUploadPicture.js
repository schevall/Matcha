import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class MyUploadPicture extends Component {

  handleDrop = (filename) => {
    this.props.handleonImageDrop(filename[0]);
  }

  render() {
    const { picturesNb } = this.props;
    if (picturesNb >= 5) return null;
    return (
      <div>
        <Dropzone
          multiple={false}
          accept="image/jpeg, image/png"
          onDrop={this.handleDrop}
          className="dropzone"
        >
          <i className="material-icons md-36">camera_enhance</i>
        </Dropzone>
      </div>
    );
  }
}

export default MyUploadPicture;
