import { Link } from 'react-router-dom';
import React from 'react';

const LinkProfile = (style, username, type = '') => {
  if (type === 'toProfile') {
    return (
      <Link style={style} to={`/profile/${username}`}>To profile</Link>);
  }
  const formatUsername = username.charAt(0).toUpperCase() + username.slice(1);
  return (
    <Link style={style} to={`/profile/${username}`}>{formatUsername}</Link>);
};

export default LinkProfile;
