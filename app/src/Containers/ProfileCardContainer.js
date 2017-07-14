import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ShowAllInfoComponent from '../Components/ShowAllInfoComponent.js';


const ProfileCardContainer = props => (

  <div className="profile_container">
    <div className="profile_container_sub">
      <div className="profile_container_sub1">
        <div className="profile_binfo_container">
          <p><b>{props.userbox.username}</b></p>
          <p>{props.profilePicture}</p>
          <p>online + date de connexion</p>
          <p>Popularity: {props.popularity ? props.popularity : 'Not calculed yet'}</p>
        </div>
        <div className="profile_picture_container" >
          <img src={props.userbox.profilePicturePath} alt="" />
        </div>
      </div>
      <div className="profile_container_sub2">
        <ShowAllInfoComponent userbox={props.userbox} />
        <br />
      </div>
    </div>
    <div className="bio_container">
      <strong>Bio</strong>
      <p className="bio_content">
        {props.bio ? props.bio : 'Write something about you !'}
      </p>
    </div>
    <div className="profile_action_container">
      <Button>Like</Button>
      <Button bsStyle="success">Chat</Button>
      <Button bsStyle="warning">Block</Button>
      <Button bsStyle="danger">Report</Button>
    </div>
  </div>
);

export default ProfileCardContainer;
