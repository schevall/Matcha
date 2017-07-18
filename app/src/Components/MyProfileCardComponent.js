import React from 'react';
import ShowAllInfoComponent from '../Components/ShowAllInfoComponent.js';
import BasicProfilCardComponent from './BasicProfilCardComponent.js';


const MyProfileCardComponent = (props) => {
  const { userInfo } = props;
  return (
    <div className="profile_container">
      <div className="profile_container_sub">
        <div className="basic_profile_container">
          <BasicProfilCardComponent userInfo={userInfo} />
        </div>
        <div className="profile_container_sub2">
          <ShowAllInfoComponent userInfo={userInfo} />
          <br />
        </div>
      </div>
      <div className="bio_container">
        <strong>Bio</strong>
        <p className="bio_content">
          {userInfo.bio ? userInfo.bio : 'Write something about you !'}
        </p>
      </div>
    </div>
  );
};

export default MyProfileCardComponent;
