import React, { Component } from 'react';
import GalleryComponent from '../Components/GalleryComponent.js';
import secureAxios from '../secureAxios.js';

class GalleryContainer extends Component {

  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      user: props.user,
      pictures: [],
    };
  }

  handleUpdate = () => {
    secureAxios('/user/allpictures', 'GET')
      .then(({ data }) => {
        console.log('resp in galerry container', data);
        this.setState({
          pictures: data.photoUrl,
        });
        console.log('in gallery state = ', this.state.pictures);
      });
  }

  render() {
    const user = this.state.user;
    return (
      <GalleryComponent
        user={user}
        pictures={this.state.pictures}
        handleUpdate={this.handleUpdate}
      />
    );
  }
}

export default GalleryContainer;
