import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Notifications from 'react-notification-system-redux';
import Badge from 'material-ui/Badge';
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
      messageCount: 0,
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
          this.getNewMessageCount();
        });
      const { pathname } = this.props.location;
      this.pathname = pathname;
      const target = pathname.split('/').pop();
      if (pathname.includes('/profile')) {
        global.socket.emit('visit', target);
      }
      if (pathname.includes('/chat/')) {
        global.socket.emit('resetMessageCount', target);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { username, isLogged, profilePicturePath } = nextProps;
    this.setState({
      username, isLogged, profilePicturePath,
    });
    const { pathname } = nextProps.location;
    this.pathname = pathname;
    const target = pathname.split('/').pop();
    if (pathname.includes('/profile')) {
      global.socket.emit('visit', target);
    }
    if (pathname.includes('/chat/')) {
      global.socket.emit('resetMessageCount', target);
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
    global.socket.off('resetMessageCount');
    global.socket.off(`message/${this.state.username}`);
  }

  getNewMessageCount = () => {
    secureAxios('/chat/getNewMessageCount', 'GET')
      .then(({ data }) => {
        if (!data.error) {
          console.log('GET newMessageCount');
          const { messageCount } = data;
          this.setState({ messageCount });
        }
      });
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
    global.socket.on('resetMessageCount', () => { this.getNewMessageCount(); });
    global.socket.on(`messageCount/${this.state.username}`, (target) => {
      console.log('Message received');
      this.handleNewMessage(target);
    });
  }

  handleNewMessage = (target) => {
    console.log('IN HANDLE NEW MESSAGE', this.pathname);
    if (!this.pathname.includes(`/chat/${target}`)) {
      const { messageCount } = this.state;
      const newMessageCount = messageCount + 1;
      this.setState({ messageCount: newMessageCount });
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
    const { messageCount } = this.state;
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
            <ol className="nav-item">
              <Badge style={{ padding: '0px 20px' }} badgeContent={messageCount} secondary>
                <Link to="/chat" className="glyphicon glyphicon-comment" />
              </Badge>
            </ol>
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
