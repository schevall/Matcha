import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
// import PhotoComponent from './PhotoComponent.js'

const GalleryComponent = props => (

  <div>
    gallery <br />
    <RaisedButton
      type="submit"
      label="update"
      onClick={props.handleUpdate}
      primary
    />
  </div>
);

export default GalleryComponent;
