import React, { Component } from 'react';
import { connect } from 'react-redux';
import secureAxios from '../secureAxios.js';
import ProfileCardContainer from './ProfileCardContainer.js';
import ProgressBarComponent from '../Components/ProgressBarComponent.js';
import GalleryContainer from './GalleryContainer.js';
import * as M from '../Actions/MessageGeneral/messageGeneralBound';

class MyProfileContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      picturesNb: 0,
      picturesPath: [],
      profilePicturePath: '/static/icons/ic_face_black_36dp_2x.png',
      gender: null,
      orient: 'Bisexual',
      popularity: '',
      firstname: '',
      lastname: '',
      email: '',
      bio: '',
      geo: '',
      tags: [],
      likedby: [],
      liketo: [],
      notification: [],
    };
  }

  componentDidMount = () => {
    const url = '/users/initprofile';
    secureAxios(url, 'GET')
      .then(({ data }) => {
        if (data.error) {
          console.log('error with getnbofpictures');  //  to change
        } else {
          this.setState({
            picturesNb: data.userbox.picturesNb,
            picturesPath: data.userbox.photoUrl,
            profilePicturePath: data.userbox.profilePicturePath,
            gender: data.userbox.gender,
            orient: data.userbox.orient,
            popularity: data.userbox.popularity,
            firstname: data.userbox.firstname,
            lastname: data.userbox.lastname,
            email: data.userbox.email,
            geo: data.userbox.geo,
            tags: data.userbox.tags,
            likedby: data.userbox.likedby,
            liketo: data.userbox.liketo,
            notification: data.userbox.notification,
          });
        }
      });
  }

  handleFavorite = (fileName) => {
    const url = '/users/favoritepicture';
    const input = { fileName };
    secureAxios(url, 'POST', input)
      .then(({ data }) => {
        if (data.error) {
          console.log('error with faving'); //  to change
        } else {
          const { profilePicturePath } = data;
          this.setState({
            profilePicturePath,
          });
        }
      });
  }

  handleRemove = (fileName) => {
    const fileNamePath = `/static/${this.state.username}/${fileName}`;
    if (fileNamePath === this.state.profilePicturePath) {
      this.props.dispatch(M.errorGeneralSendingBound("You can't erase your profile picture !"));
      return;
    }
    const url = '/users/removepicture';
    const input = { fileName };
    secureAxios(url, 'POST', input)
      .then(({ data }) => {
        const picturesPath = [];
        this.state.picturesPath.map((item) => {
          if (item !== data.fileName) {
            return picturesPath.push(item);
          }
          return null;
        });
        const { picturesNb } = data;
        this.setState({
          picturesPath,
          picturesNb });
      });
  }

  handleImageUpload = (file) => {
    const url = '/users/upload';
    const formData = new FormData();
    formData.append('imageUploaded', file);
    secureAxios(url, 'POST', formData, { 'Content-Type': 'multipart/form-data' })
      .then(({ data }) => {
        if (data.error) {
          this.setState({ errorUpload: data.message });
        } else {
          const { picturesNb } = data;
          const { picturesPath } = this.state;
          picturesPath.push(data.fileName);
          this.setState({ picturesPath, picturesNb });
        }
      });
  }

  render() {
    // console.log('in lobby, isLogged = ', isLogged)
    const { picturesNb, picturesPath, username } = this.state;
    const completionProgress = '100%';
    return (
      <div className="profile_page_container">
        <ProgressBarComponent completionProgress={completionProgress} />
        <ProfileCardContainer userbox={this.state} />
        <GalleryContainer
          username={username}
          picturesNb={picturesNb}
          picturesPath={picturesPath}
          handleFavorite={this.handleFavorite}
          handleRemove={this.handleRemove}
          handleImageUpload={this.handleImageUpload}
        />
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
export default connect(mapStateToProps)(MyProfileContainer);
