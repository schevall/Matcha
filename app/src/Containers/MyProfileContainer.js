import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CircularProgress from 'material-ui/CircularProgress';

import secureAxios from '../secureAxios.js';
import MyProfileCardComponent from '../Components/MyProfileCardComponent.js';
import GalleryContainer from './GalleryContainer.js';

class MyProfileContainer extends Component {

  constructor() {
    super();
    this.state = {
      userInfo: null,
    };
  }

  componentDidMount = () => {
    const url = '/users/initprofile';
    secureAxios(url, 'GET')
      .then(({ data }) => {
        if (data.error) {
        } else {
          const { userInfo } = data;
          console.log('resp =', data);
          this.setState({
            userInfo,
          });
        }
      });
  }

  ModifyGeneralInfo = (payload) => {
    secureAxios('/users/update/generalinfo', 'POST', payload)
    .then(({ data }) => {
      if (data.error) {
        this.props.dispatch(Notifications.error({ title: data.message }));
      } else {
        const { userInfo } = data;
        const title = 'Your infos has been changed';
        this.props.dispatch(Notifications.success({ title }));
        this.setState({ userInfo });
      }
    });
  }

  ModifyEmail = (email) => {
    secureAxios('/users/update/email', 'POST', email)
    .then(({ data }) => {
      if (data.error) {
        this.props.dispatch(Notifications.error({ title: data.message }));
      } else {
        const { userInfo } = data;
        const title = 'Your email has been changed';
        this.props.dispatch(Notifications.success({ title }));
        this.setState({ userInfo });
      }
    });
  }

  ModifyPassword = (payload) => {
    secureAxios('/users/update/password', 'POST', payload)
    .then(({ data }) => {
      if (data.error) {
        this.props.dispatch(Notifications.error({ title: data.message }));
      } else {
        const title = 'Your password has been changed';
        this.props.dispatch(Notifications.success({ title }));
      }
    });
  }

  handleTag = (action, value = null) => {

  }

  SetFavorite = (fileName) => {
    secureAxios('/users/favoritepicture', 'POST', { fileName })
      .then(({ data }) => {
        if (data.error) {
          console.log('error with faving'); //  to change
        } else {
          const { profilePicturePath } = data;
          const { userInfo } = this.state;
          userInfo.profilePicturePath = profilePicturePath;
          this.setState({ userInfo });
        }
      });
  }

  RemovePicture = (fileName) => {
    secureAxios('/users/removepicture', 'POST', { fileName })
      .then(({ data }) => {
        if (data.error) {
          console.log(data.message);
        } else {
          const { userInfo } = this.state;
          userInfo.picturesPath = data.picturesPath;
          userInfo.profilePicturePath = data.profilePicturePath;
          this.setState({ userInfo });
        }
      });
  }

  ImageUpload = (file) => {
    const url = '/users/upload';
    const formData = new FormData();
    formData.append('imageUploaded', file);
    secureAxios(url, 'POST', formData, { 'Content-Type': 'multipart/form-data' })
      .then(({ data }) => {
        if (data.error) {
          this.setState({ errorUpload: data.message });
        } else {
          const { picturesNb, picturesPath } = data;
          const { userInfo } = this.state;
          userInfo.picturesPath = picturesPath;
          userInfo.picturesNb = picturesNb;
          this.setState({ userInfo });
        }
      });
  }

  render() {
    console.log('state in main ', this.state);
    const { isLogged } = this.props;
    if (!isLogged) return (<Redirect to="/signin" />);
    if (!this.state.userInfo) return <CircularProgress />;

    const { picturesPath, profilePicturePath, username } = this.state.userInfo;
    const { userInfo } = this.state;
    return (
      <div className="profile_page_container">
        <MyProfileCardComponent
          generalModifier={this.ModifyGeneralInfo}
          emailModifier={this.ModifyEmail}
          passwordModifier={this.ModifyPassword}
          userInfo={userInfo}
        />
        <GalleryContainer
          username={username}
          picturesPath={picturesPath}
          profilePicturePath={profilePicturePath}
          handleFavorite={this.SetFavorite}
          handleRemove={this.RemovePicture}
          handleImageUpload={this.ImageUpload}
        />
      </div>
    );
  }
}

MyProfileContainer.PropTypes = {
  username: PropTypes.string,
  isLogged: PropTypes.bool,
  notifications: PropTypes.Object,
};

MyProfileContainer.defaultProps = {
  username: '',
  isLogged: false,
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
