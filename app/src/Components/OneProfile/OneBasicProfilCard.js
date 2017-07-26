import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import secureAxios from '../../secureAxios.js';
import Interactions from '../../Containers/Interactions.js';
import calculateAge from '../../ToolBox/CalculAge.js';
import * as I from '../../ToolBox/MatchingCalculator.js';

class OneBasicProfilCard extends Component {

  constructor(props) {
    super(props);
    const { visitor, button, target } = props;
    const actions = this.GetPossibleActions(target, visitor);
    this.state = {
      visitor,
      button,
      target,
      actions,
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
    const actions = {};
    actions.canlike = !I.hasLiked(target, visitor);
    actions.canchat = I.isaMatch(target, visitor);
    actions.canblock = !I.hasBlocked(target, visitor);
    actions.canreport = !I.hasReported(target, visitor);
    return actions;
  }


  SendActions = (action) => {
    const visitor = this.state.visitor.username;
    const target = this.state.target.username;
    const payload = { visitor, target, action };
    secureAxios(`/interactions/${action}`, 'POST', payload)
      .then(({ data }) => {
        if (data.error) {
          this.props.dispatch(Notifications.error({ title: data.message }));
        } else {
          const { field, newstatut, message } = data;
          const { actions } = this.state;
          console.log('BEFORE', actions);
          actions[field] = newstatut;
          console.log('AFTER', actions);
          this.setState({
            actions,
          });
          this.props.dispatch(Notifications.success({ title: message }));
        }
      });
  }

  render() {
    const { logged, lastConnection, profilePicturePath, username,
            popularity, orient, gender, birthDate } = this.state.target;
    const { button, actions } = this.state;
    console.log('BASICS ACTION', actions);
    const { path, info } = this.ProfilePictureDisplay(username, profilePicturePath);
    const connection = this.ConnectionDisplay(logged, lastConnection);
    const age = calculateAge(birthDate);
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
        {!button ? null :
        <Interactions
          actions={actions}
          handleActions={this.SendActions}
        />}
      </div>);
  }
}

const mapStateToProps = ({
  notifications,
}) => ({
  notifications,
});

export default connect(mapStateToProps)(OneBasicProfilCard);
