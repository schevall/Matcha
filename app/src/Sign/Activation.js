import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Notifications from 'react-notification-system-redux';

class Activation extends Component {

  state = {
    activationkey: '',
    username: '',
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  sendKey = (e) => {
    e.preventDefault();
    const { activationkey, username } = this.state;
    if (!activationkey || !username) return null;
    axios.post('/api/activation', { activationkey, username })
     .then(({ data }) => {
       if (data.error) {
         this.props.dispatch(Notifications.error({ title: data.message }));
       } else {
         const title = 'Your account is activated, you may now login';
         this.props.dispatch(Notifications.success({ title }));
         this.props.history.push('/signin');
       }
     });
    return null;
  }

  render() {
    const { isLogged } = this.props;
    const output = (
      isLogged ? <Redirect to="/" /> :
      (<div className="activation-container">
        <Link to="/signin">To Signin</Link>
        <br />
        <Link to="/signup">To Signup</Link>
        <br />
        <label htmlFor="activation">
          <span>Enter your username</span>
          <input id="username" required type="text" onChange={this.handleChange} />
        </label>
        <br />
        <label htmlFor="activation">
          <span>Enter your activation key</span>
          <input id="activationkey" required type="password" onChange={this.handleChange} />
        </label>
        <button type="submit" onClick={this.sendKey}>Submit</button>
      </div>));
    return output;
  }
}

Activation.PropTypes = {
  isLogged: PropTypes.bool,
  notifications: PropTypes.object,
};

Activation.defaultProps = {
  notifications: null,
};

const mapStateToProps = ({
  loginReducer: { isLogged },
  notifications,
}) => ({
  isLogged,
  notifications,
});

export default connect(mapStateToProps)(Activation);
