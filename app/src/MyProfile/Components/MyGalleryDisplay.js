import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import MyUploadPicture from '../Components/MyUploadPicture.js';

class MyGalleryDisplay extends Component {

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

  formatGallery = (username, picturesPath) => {
    if (picturesPath === undefined || !picturesPath.length) return null;
    const output = picturesPath.map((src) => {
      const path = `/static/${username}/${src}`;
      return (
        <div key={src} id={src} className="gallery_pictures_container" >
          <img
            className=""
            src={path}
            alt=""
            height="200"
          />
          <button className="favorite_button" onClick={this.handleClick}>
            <i className="material-icons orange600">star_border</i>
          </button>
          <button className="delete_button" onClick={this.handleClick}>
            <i className="material-icons">delete</i>
          </button>
        </div>);
    });
    return output;
  }

  render() {
    const { picturesPath, username, picturesNb } = this.props;
    const Gallery = this.formatGallery(username, picturesPath);
    return (
      <Row>
        {Gallery}
        <MyUploadPicture
          picturesNb={picturesNb}
          handleonImageDrop={this.props.handleonImageDrop}
        />
      </Row>
    );
  }
}

export default MyGalleryDisplay;
