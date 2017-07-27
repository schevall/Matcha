import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Notifications from 'react-notification-system-redux';

import Logout from './Logout';

class NavBar extends Component {

  constructor(props) {
    super(props);
    console.log('NAV', props);
    const { username, isLogged } = props;
    this.state = {
      username,
      isLogged,
    };
  }

  componentDidMount() {
    const { username, isLogged } = this.state;
    if (username && isLogged) {
      const token = localStorage.getItem('access_token');
      console.log('DID MOUNT', username, token);
      this.socket = io('http://localhost:8000', {
        query: `token=${token}`,
      });
      this.socket.emit('login', username);
      this.socket.on('logged', (msg) => {
        this.props.dispatch(Notifications.success({ title: msg }));
      });
    }
  }

  render() {
    const { isLogged, username } = this.state;
    if (!isLogged || !username) {
      return null;
    }
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Matcha</Link>
        </div>
        <div className="navbar-collapse collapse">
          <ul className="navbar-nav">
            <ol className="nav-item"><Link to="/myprofile" className="glyphicon glyphicon-user" /></ol>
            <ol className="nav-item"><Link to="/activy" className="glyphicon glyphicon-flag" /></ol>
          </ul>
          <ul className="navbar-nav">
            <Logout />
          </ul>
        </div>
      </nav>
    );
  }
}

NavBar.PropTypes = {
  isLogged: PropTypes.bool,
  username: PropTypes.string,
};

const mapStateToProps = ({
  loginReducer: { isLogged, username },
}) => ({
  isLogged,
  username,
});


export default connect(mapStateToProps)(NavBar);
