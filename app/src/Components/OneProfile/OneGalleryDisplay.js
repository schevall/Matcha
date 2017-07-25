import React, { Component } from 'react';

export default class OneGalleryDisplay extends Component {

  constructor(props) {
    super(props);
    const { picturesNb, picturesPath, username } = props;
    this.state = {
      username,
      picturesNb,
      picturesPath,
    };
  }

  render() {
    const { picturesPath, picturesNb, username } = this.state;
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

    return <div className="all-additional-pictures">{ finalSrc }</div>;
  }
}
