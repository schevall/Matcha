import React, { Component } from 'react';
import MyUploadPicture from '../Components/MyUploadPicture.js';

export default class MyGalleryDisplay extends Component {

  handleClick = (event) => {
    event.preventDefault();
    const filename = event.target.parentElement.parentElement.id;
    const initiator = event.target.parentElement.className;
    if (initiator === 'favorite_button') {
      this.props.handleFavorite(filename);
    } else if (initiator === 'delete_button') {
      this.props.handleRemove(filename);
    }
    return false;
  }

  render() {
    const { picturesPath, username, picturesNb } = this.props;
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
        <button className="favorite_button" onClick={this.handleClick}>
          <i className="material-icons orange600">star_border</i>
        </button>
        <button className="delete_button" onClick={this.handleClick}>
          <i className="material-icons">delete</i>
        </button>
      </div>
    ));

    return (
      <div>
        {finalSrc}
        <MyUploadPicture
          picturesNb={picturesNb}
          handleonImageDrop={this.props.handleonImageDrop}
        />
      </div>
    );
  }
}
