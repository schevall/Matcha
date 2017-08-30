import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import ConnectionDisplay from '../../ToolBox/ConnectionDisplay.js';


import LinkProfile from '../../ToolBox/LinkProfile.js';

class ConversationCard extends Component {

  constructor(props) {
    super(props);
    const { target, newMessage } = props;
    this.state = {
      mounted: false,
      newMessage,
    };
    this.target = target;
    this.styles = {
      conversation_container: {
        display: 'flex',
        justifyContent: 'center',
      },
      conversation_item: {
        width: '300px',
        height: '150px',
        marginTop: '10px',
        backgroundColor: 'white',
        padding: '10px',
      },
      connection: {
        textAlign: 'center',
      },
      link: {
        fontWeight: 200,
        fontSize: '15px',
        pointerEvents: 'true',
        color: 'inherit',
        textDecoration: 'none',
      },
      messages: {
        fontWeight: 200,
        fontSize: '15px',
      },
    };
  }

  componentWillMount = () => {
    if (!this.state.mounted) {
      global.socket.emit('isUserLogged', this.target);
    }
    global.socket.on(`message/${this.target}`, () => {
      this.setState({ newMessage: this.state.newMessage + 1 });
    });
    global.socket.on(`userIsLogged/${this.target}`, (statement) => {
      if (!this.state.mounted) {
        this.setState({ isTargetLogged: statement, mounted: true });
      }
    });
  }

  componentWillUnmount = () => {
    global.socket.off('isUserLogged');
    global.socket.off(`userIsLogged/${this.target}`);
    global.socket.off(`message/${this.target}`);
  }

  render() {
    const { mounted } = this.state;
    if (!mounted) return <CircularProgress />;
    const { isTargetLogged } = this.state;
    const { path, target } = this.props;
    const { connectionTitle } = ConnectionDisplay(isTargetLogged);
    const toProfile = LinkProfile(this.styles.link, target, 'toProfile');
    const toChat = <Link style={this.styles.link} to={`/chat/${target}`}>To Chat</Link>;
    const { newMessage } = this.state;
    const newMessageDisplay = newMessage ? `${newMessage} new messages` : 'no new message';
    return (
      <div style={this.styles.conversation_container}>
        <div style={this.styles.conversation_item}>
          <div className="container-fluid">
            <div className="row">{target}</div>
            <div className="row">
              <div className="col"><Avatar src={path} /></div>
              {connectionTitle}
            </div>
            <div className="row">{toProfile}</div>
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">{toChat}</div>
              <div style={this.styles.messages} className="col-xs-6 col-sm-6 col-md-6 col-lg-6">{newMessageDisplay}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConversationCard;
