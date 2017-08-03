import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Notifications from 'react-notification-system-redux';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';

import secureAxios from '../secureAxios.js';
import Logout from './Logout';

class NavBar extends Component {

  constructor(props) {
    super(props);
    const { username, isLogged } = props;
    this.state = {
      username,
      isLogged,
      profilePicturePath: '',
    };
  }

  componentDidMount() {
    const { username, isLogged } = this.state;
    if (username && isLogged) {
      const token = localStorage.getItem('access_token');
      this.socket = io('http://10.12.8.16:8000', {
        query: `token=${token}`,
      });
      global.socket = this.socket;
      this.socket.on('connect', () => {
        console.log('connected from the client side', this.socket.id);
      });
      this.socket.on('visit', (visitor) => {
        const title = `${visitor} has visited your profile !`;
        this.props.dispatch(Notifications.success({ title }));
      });

      this.socket.on('like', (visitor) => {
        const title = `${visitor} has liked your profile !`;
        this.props.dispatch(Notifications.success({ title }));
      });

      this.socket.on('unlike', (visitor) => {
        const title = `${visitor} has unliked your profile !`;
        this.props.dispatch(Notifications.error({ title }));
      });
      this.socket.on('match', (visitor) => {
        const title = `You may now chat with ${visitor} !!!`;
        this.props.dispatch(Notifications.success({ title }));
      });
      this.socket.on('unmatch', (visitor) => {
        const title = `You cannot chat with ${visitor} anymore =/`;
        this.props.dispatch(Notifications.error({ title }));
      });
      this.socket.on('block', (visitor) => {
        const title = `${visitor} has blocked you !`;
        this.props.dispatch(Notifications.error({ title }));
      });
      this.socket.on('unblock', (visitor) => {
        const title = `${visitor} has unblocked you !!!`;
        this.props.dispatch(Notifications.success({ title }));
      });

      secureAxios(`/users/getfavoritepicture/${username}`, 'GET')
        .then(({ data }) => {
          if (!data.error) {
            const { profilePicturePath } = data;
            this.setState({ profilePicturePath });
          }
        });

      const { pathname } = this.props.location;
      if (pathname.includes('/profile')) {
        const target = pathname.split('/').pop();
        this.socket.emit('visit', target);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { username, isLogged } = nextProps;
    this.setState({
      username, isLogged,
    });
    const { pathname } = nextProps.location;
    if (pathname.includes('/profile')) {
      const target = pathname.split('/').pop();
      this.socket.emit('visit', target);
    }
  }

  render() {
    const { isLogged, username, profilePicturePath } = this.state;
    if (!isLogged || !username) {
      return null;
    }
    let avatar = <CircularProgress />;
    if (profilePicturePath) {
      const path = `/static/${username}/${profilePicturePath}`;
      avatar = <Link to="/myprofile"><Avatar src={path} /></Link>;
    }
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Matcha</Link>
        </div>
        <div className="navbar-collapse collapse">
          <ul className="navbar-nav">
            <ol className="nav-item">{avatar}</ol>
            <ol className="nav-item"><Link to="/activity" className="glyphicon glyphicon-flag" /></ol>
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
