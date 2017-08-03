import React from 'react';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const tooltiper = text => (
  <Tooltip id="tooltip">{text}</Tooltip>
);

const MyToolTipLink = (text, className) => {
  const tooltip = tooltiper(text.text);
  console.log('Tooltip', tooltip);
  return (
    <OverlayTrigger placement="bottom" overlay={tooltip}>
      <span className={className} />
    </OverlayTrigger>);
};

export default MyToolTipLink;
