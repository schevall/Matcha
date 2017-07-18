import React from 'react';
import Button from 'react-bootstrap/lib/Button';

const BasicProfilCardComponent = (props) => {
  const { userInfo } = props;
  return (
    <div className="profile_binfo_container">
      <p><b>{userInfo.username}</b></p>
      <p>online + date de connexion</p>
      <p>Popularity: {userInfo.popularity ? userInfo.popularity : 'Not calculed yet'}</p>
      <p>Gender: { userInfo.gender ? userInfo.gender : 'Required'}</p>
      <p>Sexual orientation: { userInfo.orient ? userInfo.orient : 'Bisexual'}</p>
      <p>Tags: { userInfo.tags }</p>
      <div className="profile_picture_container" >
        <img src={userInfo.profilePicturePath} alt="" />
      </div>
      <div className="profile_action_container">
        <Button>Like</Button>
        <Button bsStyle="success">Chat</Button>
        <Button bsStyle="warning">Block</Button>
        <Button bsStyle="danger">Report</Button>
      </div>
    </div>);
};

export default BasicProfilCardComponent;
