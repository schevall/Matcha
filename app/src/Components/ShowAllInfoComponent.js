import React from 'react';

const ShowAllInfoComponent = props => (

  <div>
    <p>First name: {props.userbox.firstname ? props.userbox.firstname : 'Optional'}</p>
    <p>Last name: {props.userbox.lastname ? props.userbox.lastname : 'Optional'}</p>
    <p>Gender: {props.userbox.gender ? props.userbox.gender : 'Required'}</p>
    <p>Sexual Orientation: {props.userbox.orient ? props.userbox.orient : 'Bisexual'}</p>
    <p>Email: {props.userbox.email}</p>
  </div>
);

export default ShowAllInfoComponent;
