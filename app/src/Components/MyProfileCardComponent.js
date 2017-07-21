import React, { Component } from 'react';
import ShowAllInfoComponent from '../Components/ShowAllInfoComponent.js';
import BasicProfilCardComponent from './BasicProfilCardComponent.js';

class MyProfileCardComponent extends Component {

  constructor(props) {
    console.log('My profile card', props);
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
        email: userInfo.email,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        geo: userInfo.geo,
        gender: userInfo.gender,
        orient: userInfo.orient,
      },
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
        email: userInfo.email,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        geo: userInfo.geo,
        gender: userInfo.gender,
        orient: userInfo.orient,
      },
      bio,
    });
  }


  render() {
    const { basicInfo, extendedInfo, bio } = this.state;
    return (
      <div className="profile_container">
        <div className="profile_container_sub">
          <BasicProfilCardComponent button={false} basicInfo={basicInfo} />
          <ShowAllInfoComponent
            extendedInfo={extendedInfo}
            handleOnSubmit={this.props.modifier}
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
