import React from 'react';
import ButtonContainer from '../Containers/ButtonContainer.js';
import calculateAge from '../ToolBox/CalculAge.js';

const BasicProfilCardComponent = (props) => {
  const { basicInfo, button } = props;
  const { profilePicturePath, username, popularity, orient, gender, birthDate } = basicInfo;
  let path = '';
  let info = '';
  if (profilePicturePath) {
    path = `/static/${username}/${profilePicturePath}`;
  } else {
    path = '/static/icons/ic_face_black_36dp_2x.png';
    info = 'Add a profile picture !';
  }
  const age = calculateAge(birthDate);
  return (
    <div className="profile_binfo_container">
      <p><bold>{username}</bold></p>
      <p>online + date de connexion</p>
      <p>Popularity: {popularity}</p>
      <p>Age: {age}</p>
      <p>Gender: {gender}</p>
      <p>Sexual orientation: {orient}</p>
      <div className="profile_picture_container" >
        <img src={path} alt="" />
        <span>{info}</span>
      </div>
      <ButtonContainer activated={button} />
    </div>);
};

export default BasicProfilCardComponent;
