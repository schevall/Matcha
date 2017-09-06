import React from 'react';

const style = {
  backgroundColor: 'white',
  borderStyle: 'solid',
  borderWidth: '1px',
  position: 'fixed',
  height: '20px',
  width: '80vw',
  left: '10vw',
  bottom: 0,
  zIndex: 500,
};

const Footer = () => (
  <div style={style} className="site-footer">
    <span>this is a footer</span>
  </div>
);

export default Footer;
