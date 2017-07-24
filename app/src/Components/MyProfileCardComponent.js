import React, { Component } from 'react';
import GeneralInfo from './GeneralInfo.js';
import BasicProfilCard from './BasicProfilCardComponent.js';
import ProtectedInfo from './ProtectedInfo.js';
import MyBio from './MyBio.js';

class MyProfileCardComponent extends Component {

  constructor(props) {
    super(props);
    const { userInfo } = props;
    this.state = {
      basicInfo: {
        username: userInfo.username,
        gender: userInfo.gender,
        orient: userInfo.orient,
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
        gender: userInfo.gender,
        orient: userInfo.orient,
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
          <BasicProfilCard button={false} basicInfo={basicInfo} />
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

export default MyProfileCardComponent;
