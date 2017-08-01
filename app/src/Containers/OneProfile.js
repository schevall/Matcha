import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';

import secureAxios from '../secureAxios.js';
import OneProfileCard from '../Components/OneProfile/OneProfileCard.js';
import OneGallery from './OneGallery.js';

class OneProfile extends Component {

  constructor(props) {
    super(props);
    const { pathname } = props.location;
    this.targetname = pathname.substr(pathname.lastIndexOf('/') + 1);
    this.state = {
      target: null,
    };
  }

  componentDidMount = () => {
    const targetname = this.targetname;
    this.initProfile(targetname);
  }

  initProfile = (targetname) => {
    const url = `/users/getprofile/${targetname}`;
    secureAxios(url, 'GET')
      .then(({ data }) => {
        if (data.error) {
          if (data.error === 'notfound') {
            this.setState({ target: 'notfound', visitor: 'unhappy' });
          }
          if (data.error === 'block') {
            this.setState({ target: 'block', visitor: 'blocked' });
          }
        } else {
          const { target, visitor, actions } = data;
          console.log('resp =', data);
          this.setState({
            target, visitor, actions,
          });
        }
      });
  }

  render() {
    console.log('state in OneProfile ', this.state);
    const { isLogged } = this.props;
    if (!isLogged) return (<Redirect to="/signin" />);
    else if (!this.state.target || !this.state.visitor) return <CircularProgress />;
    else if (this.state.target === 'block') return <div>Oups, it seems that user has blocked you</div>;
    else if (this.state.target === 'notfound') return <div>Oups, this user does not exist</div>;
    const { picturesPath } = this.state.target;
    const { target, visitor } = this.state;
    return (
      <div className="profile_page_container">
        <OneProfileCard
          visitor={visitor}
          target={target}
        />
        <OneGallery
          username={target.username}
          picturesPath={picturesPath}
        />
      </div>
    );
  }
}

OneProfile.PropTypes = {
  isLogged: PropTypes.bool,
};

const mapStateToProps = ({
  loginReducer: { isLogged },
}) => ({
  isLogged,
});
export default connect(mapStateToProps)(OneProfile);
