import React from 'react';
import TextField from 'material-ui/TextField';

const ShowAllInfoComponent = (props) => {
  const { userInfo } = props;
  return (
    <div className="profile_allinfo_container">
      <TextField
        defaultValue={userInfo.firstname}
        floatingLabelText="First name"
      /><br />
      <TextField
        defaultValue={userInfo.lastname}
        floatingLabelText="Last name"
      /><br />
      <TextField
        defaultValue={userInfo.email}
        floatingLabelText="email"
      /><br />
      <p>First name: { userInfo.firstname ? userInfo.firstname : 'Optional'}</p>
      <p>Last name: { userInfo.lastname ? userInfo.lastname : 'Optional'}</p>
      <p>Email: { userInfo.email }</p>
    </div>);
};

export default ShowAllInfoComponent;
