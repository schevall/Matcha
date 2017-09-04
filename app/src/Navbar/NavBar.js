import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Notifications from 'react-notification-system-redux';
import Avatar from 'material-ui/Avatar';
import { Grid, Row, Col } from 'react-bootstrap';


import secureAxios from '../secureAxios.js';
import Logout from './Logout.js';

class NavBar extends Component {

  constructor(props) {
    super(props);
    const { username, isLogged } = props;
    this.pathname = this.props.location.pathname;
    this.target = this.pathname.split('/').pop();
    this.state = {
      username,
      isLogged,
      messageCount: 0,
      activityCount: 0,
      mounted: false,
    };
    this.style = {
      icons: { color: '#4b4c3f', fontSize: 25, textAlign: 'center' },
    };
  }

  componentWillMount() {
    const { username, isLogged } = this.state;
    if (username && isLogged) {
      this.initSocket();
      secureAxios('/users/initNavbar', 'GET')
        .then(({ data }) => {
          if (data.error) {
            console.log(data.error);
          } else {
            const { messageCount, blockedby, blockedto, activityCount } = data;
            this.setState({ messageCount, activityCount, blockedby, blockedto, mounted: true });
            const target = this.pathname.split('/').pop();
            if (this.pathname.includes('/profile') && !blockedby.includes(target)) {
              global.socket.emit('visit', target);
            } else if (this.pathname.includes(`/chat/${target}`)) {
              this.updateMessageCount(target, 'deferred');
            } else if (this.pathname.includes('/activity')) {
              this.setState({ activityCount: 0 });
            }
          }
        });
    }
  }

  componentDidUpdate(prevProps) {
    const oldPathname = prevProps.location.pathname;
    const newPathname = this.props.location.pathname;
    const { blockedby } = this.state;
    if (newPathname !== oldPathname) {
      this.pathname = this.props.location.pathname;
      const target = this.pathname.split('/').pop();
      this.target = target;
      if (this.pathname.includes('/profile') && !blockedby.includes(target)) {
        global.socket.emit('visit', target);
      } else if (this.pathname.includes(`/chat/${target}`)) {
        this.updateMessageCount(target, 'deferred');
      } else if (this.pathname.includes('/activity')) {
        this.setState({ activityCount: 0 });
      }
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
    global.socket.off('message');
    global.socket.off('activity');
    global.socket.disconnect();
  }

  handleBlock = (target, action) => {
    if (action === 'block') {
      const { blockedby } = this.state;
      blockedby.push(target);
      this.setState({ blockedby });
    } else if (action === 'unblock') {
      const { blockedby } = this.state;
      if (blockedby.includes(target)) {
        const index = blockedby.indexOf(target);
        blockedby.splice(index, 1);
      }
      this.setState({ blockedby });
    }
  }

  updateMessageCount = (target, mode) => {
    secureAxios(`/chat/updateMessageCount/${target}`, 'GET')
      .then(({ data }) => {
        if (data.error) console.log(data.error);
        else if (mode === 'deferred') {
          const { erased } = data;
          const { messageCount } = this.state;
          const newMessageCount = messageCount - erased;
          this.setState({ messageCount: newMessageCount });
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
    global.socket.on('block', (visitor) => {
      this.handleBlock(visitor, 'block');
      this.props.dispatch(Notifications.error({ title: `${visitor} has blocked you !` }));
    });
    global.socket.on('unblock', (visitor) => {
      this.handleBlock(visitor, 'unblock');
      this.props.dispatch(Notifications.success({ title: `${visitor} has unblocked you !!!` }));
    });
    global.socket.on('message', (target) => {
      this.handleNewMessage(target);
    });
    global.socket.on('activity', () => {
      this.handleNewActivity();
    });
  }

  handleNewMessage = (target) => {
    if (this.pathname.includes(`/chat/${target}`)) {
      this.updateMessageCount(target, 'realTime');
    } else {
      const { messageCount } = this.state;
      const newMessageCount = messageCount + 1;
      this.setState({ messageCount: newMessageCount });
    }
  }

  handleNewActivity = () => {
    if (!this.pathname.includes('/activity')) {
      const { activityCount } = this.state;
      const newActivityCount = activityCount + 1;
      this.setState({ activityCount: newActivityCount });
    }
  }

  render() {
    const { isLogged, username, mounted } = this.state;
    const { profilePicturePath } = this.props;
    if (!isLogged || !username || !mounted) {
      return null;
    }
    const path = `/static/${username}/${profilePicturePath}`;
    const avatar = profilePicturePath ? <Link to="/myprofile"><Avatar src={path} /></Link>
    : <Link style={{ fontSize: 35, color: 'black' }} className="glyphicon glyphicon-exclamation-sign" to="/myprofile" />;
    const { messageCount, activityCount } = this.state;
    return (
      <Grid style={{ width: '80vw' }}>
        <Row >
          <Col xs={12} sm={12} md={12} lg={9} lgOffset={2} className="border">
            <Row style={{ padding: '10px' }}>
              <Col xs={2} >
                {avatar}
              </Col>
              <Col xs={2}>
                <Link to="/" style={this.style.icons} className="glyphicon glyphicon-search" />
              </Col>
              <Col xs={2}>
                <Link to="/activity" style={this.style.icons} className="glyphicon glyphicon-flag" />
                <span className="badge badge-primary">{activityCount}</span>
              </Col>
              <Col xs={2}>
                <Link to="/chat" style={this.style.icons} className="glyphicon glyphicon-comment" />
                <span className="badge badge-primary">{messageCount}</span>
              </Col>
              <Col xs={2} lgOffset={2}>
                <Logout style={this.style.icons} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
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
