import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import { connect } from 'react-redux';
import secureAxios from '../secureAxios.js';
import { errorGeneralSendingBound,
        messageGeneralSendingBound,
       } from '../Actions/MessageGeneral/messageGeneralBound.js';

class UploadPictureContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.username
    };
  }

  handleonImageDrop = (files) => {
    console.log('in handle', files);
    this.handleImageUpload(files[0]);
  }


  handleImageUpload = (file) => {
    const url = `/users/${this.state.username}/upload`;
    const formData = new FormData();
    console.log('in upload front, file =', file);
    formData.append('imageUploaded', file);
    console.log('in upload front, form data =', formData);
    secureAxios(url, 'POST', formData, { 'Content-Type': 'multipart/form-data' })
      .then(({ data }) => {
        console.log('in app, response = ', data);
        if (data.error) {
          this.props.dispatch(errorGeneralSendingBound(data.message));
        } else if (data.numberOfPictures < 5) {
          this.props.dispatch(messageGeneralSendingBound(`You have ${5 - data.numberOfPictures} space left for pictures`));
        } else if (data.numberOfPictures === 5) {
          this.props.dispatch(messageGeneralSendingBound('Last picture uploaded, erase some to upload new pictures'));
        }
      });
  }

  render() {
    return (
      <div>
        <div className="FileUpload">
          <h4>photo of {this.state.username}</h4>
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.handleonImageDrop}
          >
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  messageReducer: { message, format },
}) => ({
  message,
  format,
});

export default connect(mapStateToProps)(UploadPictureContainer);
