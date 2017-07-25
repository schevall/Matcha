import React, { Component } from 'react';
import Interactions from '../../Containers/Interactions.js';
import calculateAge from '../../ToolBox/CalculAge.js';

export default class MyBasicProfilCard extends Component {

  constructor(props) {
    super(props);
    const { visitor, button, target } = props;
    this.state = {
      visitor,
      button,
      target,
    };
    this.styles = {
      username: {
        fontWeight: 700,
        fontSize: '25px',
      },
    };
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
    const { hours, min, sec } = this.getDiffDate(lastConnection);
    const diff = this.getDateMessage(hours, min, sec);
    if (logged) {
      return (
        <p><img src="/static/icons/Online.png" alt="" /> Online since : {diff}</p>
      );
    }
    return (
      <p><img src="/static/icons/Offline.png" alt="" /> Offline since : {diff}</p>
    );
  };

  GetPossibleActions = (target, visitor) => {

  }

  render() {
    console.log('in BASIC', this.state);
    const { logged, lastConnection, profilePicturePath, username,
            popularity, orient, gender, birthDate } = this.state.target;
    const { button, visitor, target } = this.state;
    const { path, info } = this.ProfilePictureDisplay(username, profilePicturePath);
    const connection = this.ConnectionDisplay(logged, lastConnection);
    const age = calculateAge(birthDate);
    const actions = this.GetPossibleActions(target, visitor);
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
        {!button ? null : <Interactions visitor={visitor} target={target} action={actions} />}
      </div>);
  }
}
