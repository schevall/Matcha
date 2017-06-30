import React from 'react';
import PhotoComponent from './PhotoComponent.js';

const GalleryComponent = (props) => {
  const pictures = props.pictures;
  console.log('in gallery component', pictures);
  const listPictures = pictures.map(picture =>
    picture,
  );
  return (
    listPictures ? <PhotoComponent /> :
    null
  );
};

export default GalleryComponent;
