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
    const { username } = props;
    const { pathname } = props.location;
    this.targetname = pathname.substr(pathname.lastIndexOf('/') + 1);
    this.state = {
      target: null,
    };
  }

  componentDidMount = () => {
    const targetname = this.targetname;
    const url = `/users/getprofile/${targetname}`;
    secureAxios(url, 'GET')
      .then(({ data }) => {
        if (data.error) {
        } else {
          const { target, visitor, actions } = data;
          console.log('resp =', data);
          this.setState({
            target, visitor, actions,
          });
        }
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('SHOULD', nextProps, nextState);
    return true;
  }

  render() {
    console.log('state in OneProfile ', this.state);
    const { isLogged } = this.props;
    if (!isLogged) return (<Redirect to="/signin" />);
    if (!this.state.target || !this.state.visitor) return <CircularProgress />;

    const { picturesPath } = this.state.target;
    const { target, visitor } = this.state;
    return (
      <div className="profile_page_container">
        <OneProfileCard visitor={visitor} target={target} />
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
