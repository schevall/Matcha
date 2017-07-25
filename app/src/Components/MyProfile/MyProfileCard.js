import React, { Component } from 'react';
import GeneralInfo from './MyGeneralInfo.js';
import MyBasicProfilCard from './MyBasicProfilCard.js';
import ProtectedInfo from './MyProtectedInfo.js';
import MyBio from './MyBio.js';

export default class MyProfileCard extends Component {

  constructor(props) {
    super(props);
    const { userInfo } = props;
    this.state = {
      basicInfo: {
        username: userInfo.username,
        logged: userInfo.logged,
        lastConnection: userInfo.lastConnection,
        gender: userInfo.gender,
        orient: userInfo.orient,
        popularity: userInfo.popularity,
        birthDate: userInfo.birthDate,
        profilePicturePath: userInfo.profilePicturePath,
      },
      extendedInfo: {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        geo: userInfo.geo,
        gender: userInfo.gender,
        orient: userInfo.orient,
        tags: userInfo.tags,
      },
      email: userInfo.email,
      bio: userInfo.bio,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { userInfo } = nextProps;
    this.setState({
      basicInfo: {
        username: userInfo.username,
        logged: userInfo.logged,
        lastConnection: userInfo.lastConnection,
        gender: userInfo.gender,
        orient: userInfo.orient,
        popularity: userInfo.popularity,
        birthDate: userInfo.birthDate,
        profilePicturePath: userInfo.profilePicturePath,
      },
      extendedInfo: {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        geo: userInfo.geo,
        gender: userInfo.gender,
        orient: userInfo.orient,
        tags: userInfo.tags,
      },
      email: userInfo.email,
      bio: userInfo.bio,
    });
  }


  render() {
    const { basicInfo, extendedInfo, bio, email } = this.state;
    return (
      <div className="profile_container">
        <div className="profile_container_sub">
          <MyBasicProfilCard basicInfo={basicInfo} />
          <GeneralInfo
            extendedInfo={extendedInfo}
            handleOnSubmit={this.props.generalModifier}
            handleOnSubmitTags={this.props.tagModifier}
          />
          <ProtectedInfo
            handlePasswordModif={this.props.passwordModifier}
            handleEmailModif={this.props.emailModifier}
            email={email}
          />
        </div>
        <MyBio handleBioModif={this.props.bioModifier} bio={bio} />
      </div>
    );
  }
}
