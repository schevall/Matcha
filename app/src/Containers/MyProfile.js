import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CircularProgress from 'material-ui/CircularProgress';

import secureAxios from '../secureAxios.js';
import MyProfileCard from '../Components/MyProfile/MyProfileCard.js';
import MyGallery from './MyGallery.js';
import { logoutBound } from '../Actions/Login/loginBound.js';

class MyProfile extends Component {

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

  ModifyEmail = (email, password) => {
    const payload = { email, password };
    secureAxios('/users/update/email', 'POST', payload)
    .then(({ data }) => {
      if (data.error) {
        this.props.dispatch(Notifications.error({ title: data.message }));
      } else {
        const title = 'Your email has been changed =)';
        this.props.history.push('/activation');
        this.props.dispatch(logoutBound({ title }));
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

  ModifyTags = (newtags) => {
    secureAxios('/users/update/tags', 'POST', { newtags })
    .then(({ data }) => {
      if (data.error) {
        this.props.dispatch(Notifications.error({ title: data.message }));
      } else {
        const { tags } = data;
        const { userInfo } = this.state;
        userInfo.tags = tags;
        this.setState({ userInfo });
        const title = 'Your tags has been updated !';
        this.props.dispatch(Notifications.success({ title }));
      }
    });
  }

  ModifyBio = (bio) => {
    secureAxios('/users/update/generalinfo', 'POST', { bio })
    .then(({ data }) => {
      if (data.error) {
        this.props.dispatch(Notifications.error({ title: data.message }));
      } else {
        const { userInfo } = data;
        const title = 'Your bio has been updated';
        this.props.dispatch(Notifications.success({ title }));
        this.setState({ userInfo });
      }
    });
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
        <MyProfileCard
          generalModifier={this.ModifyGeneralInfo}
          emailModifier={this.ModifyEmail}
          passwordModifier={this.ModifyPassword}
          tagModifier={this.ModifyTags}
          bioModifier={this.ModifyBio}
          userInfo={userInfo}
        />
        <MyGallery
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

MyProfile.PropTypes = {
  username: PropTypes.string,
  isLogged: PropTypes.bool,
  notifications: PropTypes.Object,
};

MyProfile.defaultProps = {
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
export default connect(mapStateToProps)(MyProfile);
