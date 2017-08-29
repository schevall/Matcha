import React, { Component } from 'react';

export default class Gallery extends Component {

  render() {
    const { username, picturesPath } = this.props;
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
          <button className="favorite_button" onClick={this.props.handleClick}>
            <i className="material-icons orange600">star_border</i>
          </button>
          <button className="delete_button" onClick={this.props.handleClick}>
            <i className="material-icons">delete</i>
          </button>
        </div>);
    });
    return (
      <div>
        {output}
      </div>
    );
  }
}
