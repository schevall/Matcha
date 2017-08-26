import React from 'react';
import Dropzone from 'react-dropzone';

const MyUploadPicture = props => (
  props.picturesNb >= 5 ? null :
  <div>
    <Dropzone
      multiple={false}
      accept="image/jpeg, image/png"
      onDrop={props.handleonImageDrop}
      className="dropzone"
    >
      <i className="material-icons md-36">camera_enhance</i>
    </Dropzone>
  </div>
);

export default MyUploadPicture;
