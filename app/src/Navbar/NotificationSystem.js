import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';

class NotificationsSystem extends Component {

  render() {
    const { notifications } = this.props;
    return (
      <Notifications
        notifications={notifications}
      />
    );
  }
}

NotificationsSystem.contextTypes = {
  store: PropTypes.object,
};

NotificationsSystem.propTypes = {
  notifications: PropTypes.arrayOf(Object),
};

NotificationsSystem.defaultProps = {
  notifications: null,
};

export default connect(
  state => ({ notifications: state.notifications }),
)(NotificationsSystem);
