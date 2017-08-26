import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import { Grid, Row, Col } from 'react-bootstrap';

import secureAxios from '../../secureAxios.js';

import MyGeneralInfo from '../Components/MyGeneralInfo.js';
import MyBasicProfilCard from '../Components/MyBasicProfilCard.js';
import MyProtectedInfo from '../Components/MyProtectedInfo.js';
import MyBio from '../Components/MyBio.js';
import MyUploadPicture from '../Components/MyUploadPicture.js';
import MyGalleryDisplay from '../Components/MyGalleryDisplay.js';

import { logout, handleNewFavPic } from '../../Actions/Login/loginBound.js';

class MyProfile extends Component {

  state = {
    mounted: false,
  };

  componentDidMount = () => {
    const url = '/users/initprofile';
    secureAxios(url, 'GET')
      .then(({ data }) => {
        if (data.error) console.log(data.error);
        else {
          const {
            username, birthDate, gender, orient, email, lastConnection,
            picturesPath, profilePicturePath, firstname, lastname, geo,
            tags, likedby, liketo, blockedby, blockedto, bio,
          } = data.userInfo;
          this.setState({
            username, birthDate, gender, orient, email, lastConnection,
            picturesPath, profilePicturePath, firstname, lastname, geo,
            tags, likedby, liketo, blockedby, blockedto, bio, mounted: true,
          });
        }
      });
  }

  generalInfoState = (field, value) => {
    this.setState({ [field]: value });
  }

  generalInfoSave = () => {
    const { firstname, lastname, gender, orient } = this.state;
    const payload = { firstname, lastname, gender, orient };
    secureAxios('/users/update/generalinfo', 'POST', payload)
    .then(({ data }) => {
      if (data.error) {
        this.props.dispatch(Notifications.error({ title: data.message }));
      } else {
        this.props.dispatch(Notifications.success({ title: 'Your infos has been changed' }));
        this.setState({ firstname, lastname, gender, orient });
      }
    });
  }

  ModifyEmail = (email) => {
    const payload = { email };
    secureAxios('/users/update/email', 'POST', payload)
    .then(({ data }) => {
      if (data.error) {
        this.props.dispatch(Notifications.error({ title: data.message }));
      } else {
        this.props.dispatch(Notifications.success({ title: 'Your email has been changed' }));
      }
    });
  }

  ModifyPassword = (payload) => {
    secureAxios('/users/update/password', 'POST', payload)
    .then(({ data }) => {
      if (data.error) {
        this.props.dispatch(Notifications.error({ title: data.message }));
      } else {
        this.props.dispatch(Notifications.success({ title: 'Your password has been changed' }));
      }
    });
  }

  ModifyBio = (newbio) => {
    secureAxios('/users/update/generalinfo', 'POST', { newbio })
    .then(({ data }) => {
      if (data.error) {
        this.props.dispatch(Notifications.error({ title: data.message }));
      } else {
        const { bio } = data;
        this.props.dispatch(Notifications.success({ title: 'Your bio has been updated' }));
        this.setState({ bio });
      }
    });
  }

  SetFavorite = (fileName) => {
    secureAxios('/users/favoritepicture', 'POST', { fileName })
      .then(({ data }) => {
        if (data.error) console.log(data.error);
        else {
          const { profilePicturePath } = data;
          const { userInfo } = this.state;
          userInfo.profilePicturePath = profilePicturePath;
          this.setState({ userInfo });
          this.props.dispatch(handleNewFavPic(profilePicturePath, this.state.userInfo.username));
        }
      });
  }

  RemovePicture = (fileName) => {
    secureAxios('/users/removepicture', 'POST', { fileName })
      .then(({ data }) => {
        if (data.error) {
          this.props.dispatch(Notifications.error({ title: data.message }));
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
    const { isLogged } = this.props;
    if (!isLogged) return (<Redirect to="/signin" />);
    if (!this.state.mounted) return <CircularProgress />;
    const { picturesPath, username } = this.state;
    const picturesNb = picturesPath.length;
    const userInfo = this.state;
    return (
      <div className="profile_page_container">
        <div className="container-fluid">
          <Row className="justify-content-center">
            <Col sm={12} md={4} lg={3} className="border">
              <MyBasicProfilCard userInfo={userInfo} />
            </Col>
            <Col sm={12} md={4} lg={3} className="border">
              <MyGeneralInfo
                userInfo={userInfo}
                handleOnChange={this.generalInfoState}
                handleOnSubmit={this.generalInfoSave}
              />
            </Col>
            <Col sm={12} md={4} lg={3} className="border" >
              <MyProtectedInfo
                handlePasswordModif={this.ModifyPassword}
                handleEmailModif={this.ModifyEmail}
                email={userInfo.email}
              />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm={12} md={12} lg={9} className="border">
              <MyBio handleBioModif={this.ModifyBio} bio={userInfo.bio} />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm={12} md={12} lg={9} className="border">
              Gallery
              <Row>
                <Col sm={9} md={9} lg={7}>
                  <MyGalleryDisplay
                    picturesPath={picturesPath}
                    picturesNb={picturesNb}
                    username={username}
                    handleRemove={this.props.handleRemove}
                    handleFavorite={this.props.handleFavorite}
                  />
                </Col>
                <Col sm={3} md={3} lg={2}>
                  <MyUploadPicture
                    picturesNb={picturesNb}
                    handleonImageDrop={this.handleonImageDrop}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

MyProfile.PropTypes = {
  isLogged: PropTypes.bool,
  notifications: PropTypes.Object,
};

const mapStateToProps = ({
  loginReducer: { isLogged },
  notifications,
}) => ({
  isLogged,
  notifications,
});

export default connect(mapStateToProps)(MyProfile);
