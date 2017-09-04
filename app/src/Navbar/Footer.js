import React from 'react';

const style = {
  backgroundColor: 'white',
  borderStyle: 'solid',
  borderWidth: '1px',
  position: 'absolute',
  width: '100%',
  left: 0,
  bottom: 0,
  zIndex: 500,
};

const Footer = () => (
  <div style={style}>
    <span>this is a footer</span>
  </div>
);

export default Footer;
