import React from 'react';
import { getDiffDate } from './DateTools.js';

const ConnectionDisplay = (logged, lastConnection = 0) => {
  const connectionTime = getDiffDate(lastConnection);
  const color = logged ? 'green' : 'red';
  const text = logged ? 'Online' : 'Offline';
  const connectionTitle = (<div><span style={{ color }} className="glyphicon glyphicon-off" /><span> {text}</span></div>);
  return { connectionTitle, connectionTime };
};

export default ConnectionDisplay;
