import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import secureAxios from '../secureAxios.js';
import ActivityDisplay from './Components/ActivityDisplay.js';

class Activity extends Component {

  constructor(props) {
    super(props);
    const { username } = props;
    this.state = {
      username,
      mounted: false,
    };
  }

  componentWillMount() {
    secureAxios(`/users/getActivity/${this.state.username}`, 'GET')
      .then(({ data }) => {
        if (data.error) {
          console.log(data.error);
        } else {
          const { activity } = data.activity;
          const { oldactivity } = data.oldactivity;
          this.setState({ mounted: true, activity, oldactivity });
        }
      });
  }

  componentDidMount() {
    global.socket.on('updateActivity', (data) => {
      if (this.state.mounted) {
        const { activity } = this.state;
        const object = { author: data.author, date: Date.now(), event: data.type };
        activity.push(object);
        this.setState({ activity });
      }
    });
  }

  componentWillUnmount() {
    global.socket.off('updateActivity');
    secureAxios(`/users/resetActivity/${this.state.username}`, 'GET');
  }

  render() {
    if (!this.state.mounted) return (<CircularProgress />);
    const { activity, oldactivity } = this.state;
    return <ActivityDisplay activity={activity} oldactivity={oldactivity} />;
  }
}

Activity.PropTypes = {
  username: PropTypes.string,
};

const mapStateToProps = ({
  loginReducer: { username },
}) => ({
  username,
});

export default connect(mapStateToProps)(Activity);
