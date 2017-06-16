import React from 'react';

const MessageBarComponent = props => (

    props.message ?
      <p className={props.format}>{props.message}</p> :
      null

);

export default MessageBarComponent;
