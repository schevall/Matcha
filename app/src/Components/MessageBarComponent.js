import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';

const MessageBarComponent = props => (

    props.message ?
      <Alert className="MessageBar" bsStyle={props.format}>
        <strong>{props.message}</strong>
      </Alert>
    : null

);

export default MessageBarComponent;
