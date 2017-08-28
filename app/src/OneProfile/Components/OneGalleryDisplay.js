import React from 'react';

const OneGalleryDisplay = (props) => {
  const { picturesPath, picturesNb, username } = props;
  if (picturesNb === 0 || picturesNb === 'undefined') {
    return null;
  }
  const staticSrc = picturesPath.map(src => ({ folder: `/static/${username}/${src}`, filename: src }));
  const finalSrc = staticSrc.map(src => (
    <div key={src.filename} id={src.filename} className="gallery_pictures_container" >
      <img
        className=""
        src={src.folder}
        alt=""
        height="200"
      />
    </div>
  ));
  return <div className="all-additional-pictures">{ finalSrc }</div>;
};

export default OneGalleryDisplay;
