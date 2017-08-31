import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import { Grid, Row, Col } from 'react-bootstrap';

import secureAxios from '../secureAxios.js';
import { getDiffDate } from '../ToolBox/DateTools.js';
import ConnectionDisplay from '../ToolBox/ConnectionDisplay.js';

class Chat extends Component {

  constructor(props) {
    super(props);
    const { username } = props;
    this.styles = {
      selfRow: {
        padding: '4px',
      },
      otherRow: {
        padding: '4px',
        backgroundColor: '#a4c1bd',
      },
    };
    this.username = username;
    const { pathname } = props.location;
    this.target = pathname.substr(pathname.lastIndexOf('/') + 1);
    this.state = { loaded: false, mounted: false, input: '', canchat: true };
  }

  componentWillMount() {
    if (!this.state.mounted) {
      global.socket.emit('isUserLogged', this.target);
    }
    global.socket.on(`userIsLogged/${this.target}`, (statement) => {
      if (!this.state.mounted) {
        this.setState({ isTargetLogged: statement, mounted: true });
      }
    });
    global.socket.on(`message/${this.target}`, (newMessage) => {
      this.handleNewMessage(newMessage);
    });
    global.socket.on(`block/${this.target}`, () => {
      this.setState({ canchat: false });
    });
  }

  componentDidMount = () => {
    const target = this.target;
    const url = `/chat/getMessage/${target}`;
    secureAxios(url, 'GET')
      .then(({ data }) => {
        if (data.error) {
          this.setState({ loaded: true, canchat: false });
          console.log(data.error);
        } else {
          const { message } = data;
          const pic = message.user1 !== this.username ? message.picUser1 : message.picUser2;
          this.setState({ pic, message, loaded: true });
          this.scrollToBottom();
        }
      });
  }


  componentWillUnmount = () => {
    global.socket.off('isUserLogged');
    global.socket.off(`userIsLogged/${this.target}`);
    global.socket.off(`message/${this.target}`);
    global.socket.off(`block/${this.target}`);
  }

  handleNewMessage = (newMessage) => {
    const { message } = this.state;
    if (!message || message === undefined) {
      this.setState({ message: { conversation: [newMessage] } });
    } else {
      message.conversation.push(newMessage);
      this.setState({ message });
      this.scrollToBottom();
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    const input = e.target.value;
    this.setState({ input });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { input } = this.state;
    if (!input) return;
    const target = this.target;
    const newMessage = { author: this.username, date: Date.now(), message: input };
    this.handleNewMessage(newMessage);
    global.socket.emit('message', target, input);
    e.target.firstChild.firstChild.value = '';
    const payload = { target, input };
    secureAxios('/chat/newMessage', 'POST', payload)
      .then(({ data }) => {
        this.setState({ input: '' });
        if (data.error) console.log(data.error);
        this.scrollToBottom();
      });
  }

  formatRow = (style, key, date, author, text) => (
    <Row style={style} key={key} className="border">
      <Col className="col-xs-6 col-sm-3 col-md-2 col-lg-1">{author}</Col>
      <Col className="col-xs-6 col-sm-3 col-sm-push-6 col-md-push-8 col-md-2 col-lg-push-10 col-lg-1">
        {date}
      </Col>
      <Col className="col-xs-12 col-sm-6 col-sm-pull-3 col-md-pull-2 col-md-8 col-lg-pull-1 col-lg-10" style={{ wordBreak: 'break-all' }}>{text}</Col>
    </Row>
  )

  formatMessage = (message) => {
    if (!message || message === undefined) return <p>No messages</p>;
    const { conversation } = message;
    if (!conversation || conversation === undefined) return <p>No messages</p>;
    const output = conversation.map((el) => {
      const date = getDiffDate(el.date);
      const time = `${date} ago`;
      if (el.author === this.username) {
        return this.formatRow(this.styles.selfRow, el.date, time, 'You', el.message);
      }
      return this.formatRow(this.styles.otherRow, el.date, time, el.author, el.message);
    });
    return output;
  }

  scrollToBottom = () => {
    if (this.node) this.node.scrollIntoView();
  }


  render() {
    if (!this.state.loaded || !this.state.mounted) return (<CircularProgress />);
    const { message, input, isTargetLogged, canchat } = this.state;
    if (!canchat) return <div>Oups, it seems that {this.target} has blocked you</div>;
    const history = this.formatMessage(message);
    const { connectionTitle } = ConnectionDisplay(isTargetLogged);
    const path = `/static/${this.target}/${this.state.pic}`;
    const toProfile = `/profile/${this.target}`;
    return (
      <Grid style={{ width: '80vw' }}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={9} lgOffset={2}>
            <Row style={{ margin: '10px' }}>
              <Link to={toProfile}>
                <Avatar src={path} />
              </Link>
              { connectionTitle }
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={9} lgOffset={2} className="border" style={{ height: '75vh', overflow: 'scroll' }}>
            {history}
            <div ref={node => (this.node = node)} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={9} lgOffset={2}>
            <form onSubmit={this.handleSubmit}>
              <div className="input-group">
                <input id="chat_input" autoFocus onChange={this.handleChange} type="text" className="form-control" placeholder="Type something" />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-default" >Send!</button>
                </span>
              </div>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = ({
  loginReducer: { username },
}) => ({
  username,
});
export default connect(mapStateToProps)(Chat);
