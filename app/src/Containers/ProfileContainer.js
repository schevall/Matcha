import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileCardComponent from '../Components/ProfileCardComponent.js';
import UploadPictureContainer from '../Containers/UploadPictureContainer.js';
import GalleryContainer from '../Containers/GalleryContainer.js';

class ProfileContainer extends Component {

  render() {
    // console.log('in lobby, isLogged = ', isLogged);
    const { username } = this.props;
    return (
      <div>
        <ProfileCardComponent user={username} />
        <UploadPictureContainer user={username} />
        <GalleryContainer user={username} />
      </div>
    );
  }
}

const mapStateToProps = ({
  loginReducer: { isLogged, username },
  messageReducer: { message, format },
}) => ({
  isLogged,
  username,
  message,
  format,
});
export default connect(mapStateToProps)(ProfileContainer);
