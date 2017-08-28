import React from 'react';

const OneBio = props => (
  <div className="bio_container" style={{ padding: '10px 20px' }}>
    <h3>Bio: </h3>
    <p>{props.bio}</p>
  </div>
);

export default OneBio;
