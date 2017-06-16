import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// import GetPhoto from './GetPhoto';
import UploadPicture from './UploadPicture'

class Profile extends Component {

  render() {
    // console.log('in lobby, isLogged = ', isLogged);
    const { loggedUser } = this.props;
    return (
      <div>
        <h3>Profile page of {loggedUser}</h3>
        <h4>fu</h4>
        <UploadPicture />
      </div>
    );
  }
}

const mapStateToProps = ({
  loginReducer: { isLogged, loggedUser },
  messageReducer: { message, format },
}) => ({
  isLogged,
  loggedUser,
  message,
  format,
});
export default connect(mapStateToProps)(Profile);
