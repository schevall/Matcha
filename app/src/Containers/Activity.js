import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';

import secureAxios from '../secureAxios.js';
import ActivityDisplay from '../Components/Activity.js';

class Activity extends Component {

  constructor(props) {
    super(props);
    const { username } = props;
    this.state = {
      username,
      mounted: null,
    };
    this.style = {
      container: {
        display: 'block',
      },
      card: {
        margin: '5px',
      },
    };
  }

  componentDidMount() {
    const { username } = this.state;
    const url = `/users/getActivity/${username}`;
    secureAxios(url, 'GET')
      .then(({ data }) => {
        if (data.error) {
          console.log(data.error);
        } else {
          const { activity } = data.activity;
          console.log('RESP FROM ACTIVITY', activity);
          this.setState({ mounted: true, activity });
        }
      });
  }

  render() {
    const { isLogged } = this.props;
    if (!isLogged) return (<Redirect to="/signin" />);
    if (!this.state.mounted) return (<CircularProgress />);
    const { activity } = this.state;
    console.log('AT first ', activity);
    return (
      <div className="activity_container" style={this.style.container}>
        <ActivityDisplay activity={activity} />
      </div>
    );
  }
}

Activity.PropTypes = {
  isLogged: PropTypes.bool,
  username: PropTypes.string,
};

const mapStateToProps = ({
  loginReducer: { isLogged, username },
}) => ({
  isLogged,
  username,
});

export default connect(mapStateToProps)(Activity);
