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
    console.log('fav', fileName);
    secureAxios('/users/favoritepicture', 'POST', { fileName })
      .then(({ data }) => {
        if (data.error) console.log(data.error);
        else {
          const { profilePicturePath } = data;
          this.setState({ profilePicturePath });
          console.log('ABOUT TO DISPATH', profilePicturePath);
          this.props.dispatch(handleNewFavPic(profilePicturePath, this.state.username));
        }
      });
  }

  RemovePicture = (fileName) => {
    console.log('remo', fileName);
    secureAxios('/users/removepicture', 'POST', { fileName })
      .then(({ data }) => {
        if (data.error) {
          this.props.dispatch(Notifications.error({ title: data.message }));
        } else {
          const { picturesPath } = data;
          this.setState({ picturesPath });
        }
      });
  }

  ImageUpload = (file) => {
    console.log('in imge upload', file);
    const url = '/users/upload';
    const formData = new FormData();
    formData.append('imageUploaded', file);
    secureAxios(url, 'POST', formData, { 'Content-Type': 'multipart/form-data' })
      .then(({ data }) => {
        if (data.error) {
          this.setState({ errorUpload: data.message });
        } else {
          const { picturesPath } = data;
          this.setState({ picturesPath });
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
      <Grid fluid>
        <Row>
          <Col xs={12} sm={4} md={4} lg={3} lgOffset={1} className="border ml-xl-auto">
            <MyBasicProfilCard userInfo={userInfo} />
          </Col>
          <Col xs={12} sm={4} md={4} lg={3} className="border">
            <MyGeneralInfo
              userInfo={userInfo}
              handleOnChange={this.generalInfoState}
              handleOnSubmit={this.generalInfoSave}
            />
          </Col>
          <Col xs={12} sm={4} md={4} lg={3} className="border" >
            <MyProtectedInfo
              handlePasswordModif={this.ModifyPassword}
              handleEmailModif={this.ModifyEmail}
              email={userInfo.email}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={9} lgOffset={1} className="border">
            <MyBio handleBioModif={this.ModifyBio} bio={userInfo.bio} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={9} lgOffset={1} className="border">
            Gallery
          </Col>
        </Row>
        <Row >
          <Col xs={12} sm={12} md={12} lg={9} lgOffset={1} className="border">
            <MyGalleryDisplay
              picturesPath={picturesPath}
              picturesNb={picturesNb}
              username={username}
              handleRemove={this.RemovePicture}
              handleFavorite={this.SetFavorite}
              handleonImageDrop={this.ImageUpload}
            />
          </Col>
        </Row>
      </Grid>
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
