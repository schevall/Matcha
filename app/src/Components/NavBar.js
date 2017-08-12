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
    const { username, isLogged, profilePicturePath } = props;
    this.state = {
      username,
      isLogged,
      profilePicturePath,
    };
  }

  componentWillMount() {
    const { username, isLogged } = this.state;
    if (username && isLogged) {
      this.initSocket();
      secureAxios(`/users/getfavoritepicture/${username}`, 'GET')
        .then(({ data }) => {
          if (!data.error) {
            const { profilePicturePath } = data;
            this.setState({ profilePicturePath });
          } else if (this.props.location !== '/myprofile') {
            this.props.history.push('/myprofile');
            const title = 'You have to upload a picture to enjoy our website';
            this.props.dispatch(Notifications.error({ title }));
          }
        });

      const { pathname } = this.props.location;
      if (pathname.includes('/profile')) {
        const target = pathname.split('/').pop();
        global.socket.emit('visit', target);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { username, isLogged, profilePicturePath } = nextProps;
    this.setState({
      username, isLogged, profilePicturePath,
    });
    const { pathname } = nextProps.location;
    if (pathname.includes('/profile')) {
      const target = pathname.split('/').pop();
      global.socket.emit('visit', target);
    }
  }

  componentWillUnmount() {
    global.socket.off('connect');
    global.socket.off('visit');
    global.socket.off('like');
    global.socket.off('unlike');
    global.socket.off('match');
    global.socket.off('unmatch');
    global.socket.off('block');
    global.socket.off('unblock');
  }

  initSocket = () => {
    const token = localStorage.getItem('access_token');
    global.socket = io.connect('http://localhost:8000', { query: `token=${token}` });
    global.socket.on('connect', () => { console.log('connected from the client side', global.socket.id); });
    global.socket.on('visit', (visitor) => { this.props.dispatch(Notifications.success({ title: `${visitor} has visited your profile !` })); });
    global.socket.on('like', (visitor) => { this.props.dispatch(Notifications.success({ title: `${visitor} has liked your profile !` })); });
    global.socket.on('unlike', (visitor) => { this.props.dispatch(Notifications.error({ title: `${visitor} has unliked your profile !` })); });
    global.socket.on('match', (visitor) => { this.props.dispatch(Notifications.success({ title: `You may now chat with ${visitor} !!!` })); });
    global.socket.on('unmatch', (visitor) => { this.props.dispatch(Notifications.error({ title: `You cannot chat with ${visitor} anymore =/` })); });
    global.socket.on('block', (visitor) => { this.props.dispatch(Notifications.error({ title: `${visitor} has blocked you !` })); });
    global.socket.on('unblock', (visitor) => { this.props.dispatch(Notifications.success({ title: `${visitor} has unblocked you !!!` })); });
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
          {!profilePicturePath ? null :
          <Link to="/">Matcha</Link>
          }
        </div>
        <div className="navbar-collapse collapse">
          {!profilePicturePath ? null :
          <ul className="navbar-nav">
            <ol className="nav-item">{avatar}</ol>
            <ol className="nav-item"><Link to="/activity" className="glyphicon glyphicon-flag" /></ol>
            <ol className="nav-item"><Link to="/chat" className="glyphicon glyphicon-comment" /></ol>
          </ul>}
          <ul className="navbar-nav">
            <ol className="nav-item"><Logout /></ol>
          </ul>
        </div>
      </nav>
    );
  }
}

NavBar.PropTypes = {
  isLogged: PropTypes.bool,
  username: PropTypes.string,
  profilePicturePath: PropTypes.string,
};

const mapStateToProps = ({
  loginReducer: { isLogged, username, profilePicturePath },
}) => ({
  isLogged,
  username,
  profilePicturePath,
});


export default connect(mapStateToProps)(NavBar);
