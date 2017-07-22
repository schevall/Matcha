import React, { Component } from 'react';
import GeneralInfo from './GeneralInfo.js';
import BasicProfilCard from './BasicProfilCardComponent.js';
import ProtectedInfo from './ProtectedInfo.js';

class MyProfileCardComponent extends Component {

  constructor(props) {
    super(props);
    const { userInfo, bio } = props;
    this.state = {
      basicInfo: {
        username: userInfo.username,
        gender: userInfo.gender,
        orient: userInfo.orient,
        profilePicturePath: userInfo.profilePicturePath,
      },
      extendedInfo: {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        geo: userInfo.geo,
        gender: userInfo.gender,
        orient: userInfo.orient,
      },
      email: userInfo.email,
      bio,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { userInfo, bio } = nextProps;
    this.setState({
      basicInfo: {
        username: userInfo.username,
        gender: userInfo.gender,
        orient: userInfo.orient,
        profilePicturePath: userInfo.profilePicturePath,
      },
      extendedInfo: {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        geo: userInfo.geo,
        gender: userInfo.gender,
        orient: userInfo.orient,
      },
      email: userInfo.email,
      bio,
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
          />
          <ProtectedInfo
            handlePasswordModif={this.props.passwordModifier}
            handleEmailModif={this.props.emailModifier}
            email={email}
          />
        </div>
        <div className="bio_container">
          <strong>Bio</strong>
          <p className="bio_content">
            {bio || 'Write something about you !'}
          </p>
        </div>
      </div>
    );
  }
}

export default MyProfileCardComponent;
