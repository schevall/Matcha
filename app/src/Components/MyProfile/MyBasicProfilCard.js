import React, { Component } from 'react';
import calculateAge from '../../ToolBox/CalculAge.js';

export default class MyBasicProfilCard extends Component {

  constructor(props) {
    super(props);
    const { basicInfo } = props;
    console.log('IN BASIC', props);
    const { logged, lastConnection, profilePicturePath, username,
            popularity, orient, gender, birthDate } = basicInfo;
    this.state = {
      logged,
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
    const { logged, lastConnection, profilePicturePath, username,
            popularity, orient, gender, birthDate } = basicInfo;
    this.setState({
      logged,
      lastConnection,
      profilePicturePath,
      username,
      popularity,
      orient,
      gender,
      birthDate,
    });
  }

  getDiffDate = (lastConnection) => {
    const last = Date.parse(lastConnection);
    const today = Date.now();
    const diff = new Date(today - last);
    const hour = diff.getHours();
    const min = diff.getMinutes();
    const sec = diff.getSeconds();
    return { hour, min, sec };
  };

  getDateMessage = (hours, min, sec) => {
    if (hours) {
      return `(${hours}h : ${min}min)`;
    } else if (min) {
      return `(${min} minutes)`;
    }
    return `(${sec} seconds)`;
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
    console.log('start connectio', logged, lastConnection);
    const { hours, min, sec } = this.getDiffDate(lastConnection);
    const diff = this.getDateMessage(hours, min, sec);
    console.log('after connectio');
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
    const age = calculateAge(birthDate);
    console.log('about to render');
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
