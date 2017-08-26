import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import * as D from '../../ToolBox/DateTools.js';
import { CalculatePopularity } from '../../ToolBox/InteractionsTools.js';

export default class MyBasicProfilCard extends Component {

  styles = {
    username: {
      fontWeight: 700,
      fontSize: '25px',
    },
  };

  ProfilePictureDisplay = (username, profilePicturePath) => {
    if (profilePicturePath) {
      const path = `/static/${username}/${profilePicturePath}`;
      const info = '';
      return { path, info };
    }
    const path = '/static/icons/ic_face_black_36dp_2x.png';
    const info = 'Add a profile picture !';
    return { path, info };
  };

  ConnectionDisplay = (logged, lastConnection) => {
    const diff = D.getDiffDate(lastConnection);
    if (logged) {
      return (
        <span><img src="/static/icons/Online.png" alt="" /> Online since : {diff}</span>
      );
    }
    return (
      <span><img src="/static/icons/Offline.png" alt="" /> Offline since : {diff}</span>
    );
  };

  render() {
    const { lastConnection, profilePicturePath, username,
            orient, gender, birthDate } = this.props.userInfo;
    const { path, info } = this.ProfilePictureDisplay(username, profilePicturePath);
    const connection = this.ConnectionDisplay(true, lastConnection);
    const age = D.calculateAge(birthDate);
    const popularity = CalculatePopularity(this.props.userInfo);
    const userStyle = username.charAt(0).toUpperCase() + username.slice(1);
    return (
      <div style={{ padding: '20px' }}>
        <Row><Col style={this.styles.username}>{userStyle}</Col></Row>
        <Row><Col>{connection}</Col></Row>
        <Row><Col sm={4}>Age</Col><Col sm={8}>{age}</Col></Row>
        <Row><Col sm={4}>Popularity</Col><Col sm={8}>{popularity}</Col></Row>
        <Row><Col sm={4}>Gender</Col><Col sm={8}>{gender}</Col></Row>
        <Row><Col sm={4}>Look For</Col><Col sm={8}>{orient}</Col></Row>
        <div className="profile_picture_container" >
          <img src={path} alt="" />
          <span>{info}</span>
        </div>
      </div>
    );
  }
}
