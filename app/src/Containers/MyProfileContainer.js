import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import secureAxios from '../secureAxios.js';
import MyProfileCardComponent from '../Components/MyProfileCardComponent.js';
import ProgressBarComponent from '../Components/ProgressBarComponent.js';
import GalleryContainer from './GalleryContainer.js';

class MyProfileContainer extends Component {

  constructor() {
    super();
    this.state = {
      loaded: false,
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
            loaded: true,
            username: data.userbox.username,
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

  handleModifyInfo = (field) => {

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
      this.props.dispatch(
        Notifications.error({ title: "You can't erase your profile picture !" }),
      );
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
    if (!this.state.loaded) {
      return null;
    }
    const { picturesNb, picturesPath, username } = this.state;
    const { isLogged } = this.props;
    const completionProgress = '100%';
    return (
      !isLogged ?
        <Redirect to="/signin" /> :
        <div className="profile_page_container">
          <ProgressBarComponent completionProgress={completionProgress} />
          <MyProfileCardComponent
            handleModifyInfo={this.handleModifyInfo}
            userInfo={this.state}
          />
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

MyProfileContainer.PropTypes = {
  username: PropTypes.string,
  isLogged: PropTypes.bool,
  activated: PropTypes.bool,
  completion: PropTypes.digit,
  notifications: PropTypes.Object,
};

MyProfileContainer.defaultProps = {
  username: '',
  isLogged: false,
  activated: false,
  completion: 0,
  notifications: null,
};


const mapStateToProps = ({
  loginReducer: { isLogged, username },
  notifications,
}) => ({
  isLogged,
  username,
  notifications,
});
export default connect(mapStateToProps)(MyProfileContainer);
