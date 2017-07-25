import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';
import secureAxios from '../secureAxios.js';

class Interactions extends Component {

  constructor(props) {
    super(props);
    const { visitor, target } = props;
    this.state = {
      visitor,
      target,
    };
    this.style = {
      margin: '3px',
    };
  }

  LikeSending = (e) => {
    e.preventDefault();
    const { visitor, target } = this.state;
    const payload = { visitor: visitor.username, target: target.username };
    secureAxios('/interactions/likes', 'POST', payload)
      .then(({ data }) => {
        if (data.error) {
          this.props.dispatch(Notifications.error({ title: data.message }));
        } else {
          const title = `You have liked ${target.username}`;
          this.props.dispatch(Notifications.success({ title }));
        }
      });
  }

  DetermineActions = (visitor, target) => {
    
  }

  render() {
    return (
      <div className="profile_action_container">
        <Button onClick={this.LikeSending} style={this.style}>Like</Button>
        <Button style={this.style} bsStyle="success">Chat</Button>
        <Button style={this.style} bsStyle="warning">Block</Button>
        <Button style={this.style} bsStyle="danger">Report</Button>
      </div>
    );
  }
}

const mapStateToProps = ({
  notifications,
}) => ({
  notifications,
});

export default connect(mapStateToProps)(Interactions);
