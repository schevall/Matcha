import React, { Component } from 'react';
import GalleryComponent from '../Components/GalleryComponent.js';
import PhotoComponent from '../Components/PhotoComponent.js';
import secureAxios from '../secureAxios.js';

class GalleryContainer extends Component {

  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      username: { props },
      numberOfPictures: 0,
      pictures: [],
    };
  }

  componentDidMount = () => {
    const username = this.state;

    console.log('component did mount galeery');
    // secureAxios('/user/pictures/nb', 'GET')
    //   .then(({ data }) => {
    //     console.log('resp in galerry container nb', data);
    //     this.setState({
    //       numberOfPictures: { data },
    //     });
    //   });
    secureAxios('/users/pictures/getall', 'GET')
      .then(({ data }) => {
        console.log('resp in galerry container data', data);
        this.setState({
          pictures: data,
        });
        // console.log('in gallery state = ', this.state.pictures);
      });
  }

  render() {
    const username = this.state.username;
    const pictures = this.state.pictures;
    return (
      <PhotoComponent photo={pictures} />
    );
  }
}

export default GalleryContainer;
