import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';

import secureAxios from '../secureAxios.js';
import { getDiffDate } from '../ToolBox/DateTools.js';

class Chat extends Component {

  constructor(props) {
    super(props);
    const { username } = props;
    this.styles = {
      chat_room_container: {
        backgroundColor: 'white',
        height: '60vh',
        overflow: 'auto',
        scrollBottom: '55vh',
      },
      input: {
        margin: 'inherit',
        marginTop: '10px',
        backgroundColor: 'white',
      },
      selfRow: {
        padding: '4px',
      },
      otherRow: {
        padding: '4px',
        backgroundColor: '#a4c1bd',
      },
      chat_avatar: {
        paddingTop: '5px',
        paddingBottom: '20px',
      },
    };
    this.username = username;
    const { pathname } = props.location;
    this.target = pathname.substr(pathname.lastIndexOf('/') + 1);
    this.state = { loaded: false, mounted: false, input: '' };
  }

  componentWillMount() {
    if (!this.state.mounted) {
      global.socket.emit('isUserLogged', this.target);
    }
    global.socket.on(`userIsLogged/${this.target}`, (statement) => {
      console.log(`RECEPTION ON ${this.target}`);
      if (!this.state.mounted) {
        this.setState({ isTargetLogged: statement, mounted: true });
      }
    });
    global.socket.on(`message/${this.target}`, (newMessage) => {
      this.handleNewMessage(newMessage);
    });
  }

  componentDidMount = () => {
    const target = this.target;
    const url = `/chat/getMessage/${target}`;
    secureAxios(url, 'GET')
      .then(({ data }) => {
        if (data.error) {
          this.setState({ loaded: true });
          console.log(data.error);
        } else {
          const { message } = data;
          console.log('RESPPPPPPPP', message);
          const pic = message.user1 !== this.username ? message.picUser1 : message.picUser2;
          this.setState({ pic, message, loaded: true });
        }
      });
  }


  componentWillUnmount = () => {
    global.socket.off('isUserLogged');
    global.socket.off(`userIsLogged/${this.target}`);
    global.socket.off(`message/${this.target}`);
  }

  handleNewMessage = (newMessage) => {
    const { message } = this.state;
    if (!message) this.setState({ message: { conversation: [newMessage] } });
    else {
      message.conversation.push(newMessage);
      this.setState({ message });
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
        if (data.error) console.log(data.error);
        else {
          console.log('data from chat', data);
        }
      });
  }

  formatRow = (style, key, date, author, text) => (
    <div style={style} className="row" key={key}>
      <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">{author}</div>
      <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">{text}</div>
      <div className="col-md-1 offset-md-1" />
      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <span className="pull-right">{date}</span>
      </div>
    </div>
  )

  formatMessage = (message) => {
    if (!message) return <p>No messages</p>;
    const { conversation } = message;
    const output = [];
    conversation.map((el) => {
      const date = getDiffDate(el.date);
      const time = `${date} ago`;
      if (el.author === this.username) {
        output.push(this.formatRow(this.styles.selfRow, el.date, time, 'You', el.message));
      } else {
        output.push(this.formatRow(this.styles.otherRow, el.date, time, el.author, el.message));
      }
    });
    return output;
  }

  ConnectionDisplay = (logged) => {
    if (logged) {
      return (<div className="col flex-middle"><img src="/static/icons/Online.png" alt="" />Online</div>);
    }
    return (<div className="col flex-middle"><img src="/static/icons/Offline.png" alt="" />Offline</div>);
  };


  render() {
    const { isLogged } = this.props;
    if (!isLogged) return (<Redirect to="/signin" />);
    if (!this.state.loaded || !this.state.mounted) return (<CircularProgress />);
    const { message, input, isTargetLogged } = this.state;
    const history = this.formatMessage(message);
    const connection = this.ConnectionDisplay(isTargetLogged);
    const path = `/static/${this.target}/${this.state.pic}`;
    return (
      <div>
        <div style={this.styles.chat_avatar} className="container-fluid">
          <div className="row">
            <div className="col"><Avatar src={path} /></div>
            {connection}
          </div>
        </div>
        <div id="scroll" className="container-fluid" style={this.styles.chat_room_container}>
          {history}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input id="chat_input" onChange={this.handleChange} type="text" className="form-control" placeholder="Type something" />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-default" >Send!</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

Chat.PropTypes = {
  isLogged: PropTypes.bool,
};

const mapStateToProps = ({
  loginReducer: { isLogged, username },
}) => ({
  isLogged,
  username,
});
export default connect(mapStateToProps)(Chat);
