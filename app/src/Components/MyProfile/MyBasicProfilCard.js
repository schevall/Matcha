import React, { Component } from 'react';
import * as D from '../../ToolBox/DateTools.js';

export default class MyBasicProfilCard extends Component {

  constructor(props) {
    super(props);
    const { basicInfo } = props;
    const { lastConnection, profilePicturePath, username,
            popularity, orient, gender, birthDate } = basicInfo;
    this.state = {
      logged: true,
      lastConnection,
      profilePicturePath,
      username,
      popularity,
      orient,
      gender,
      birthDate,
    };
    this.styles = {
      username: {
        fontWeight: 700,
        fontSize: '25px',
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    const { basicInfo } = nextProps;
    const { lastConnection, profilePicturePath, username,
            popularity, orient, gender, birthDate } = basicInfo;
    this.setState({
      logged: true,
      lastConnection,
      profilePicturePath,
      username,
      popularity,
      orient,
      gender,
      birthDate,
    });
  }

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
        <p><img src="/static/icons/Online.png" alt="" /> Online since : {diff}</p>
      );
    }
    return (
      <p><img src="/static/icons/Offline.png" alt="" /> Offline since : {diff}</p>
    );
  };

  render() {
    const { logged, lastConnection, profilePicturePath, username,
            popularity, orient, gender, birthDate } = this.state;
    const { path, info } = this.ProfilePictureDisplay(username, profilePicturePath);
    const connection = this.ConnectionDisplay(logged, lastConnection);
    const age = D.calculateAge(birthDate);
    return (
      <div className="profile_binfo_container">
        <p style={this.styles.username} >{username.charAt(0).toUpperCase() + username.slice(1)}</p>
        <div>{connection}</div>
        <p>Popularity: {popularity}</p>
        <p>Age: {age}</p>
        <p>Gender: {gender}</p>
        <p>Sexual orientation: {orient}</p>
        <div className="profile_picture_container" >
          <img src={path} alt="" />
          <span>{info}</span>
        </div>
      </div>);
  }
}
