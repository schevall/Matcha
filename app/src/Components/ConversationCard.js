import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';

import LinkProfile from '../ToolBox/LinkProfile.js';

class ConversationCard extends Component {

  constructor(props) {
    super(props);
    const { target } = props;
    this.state = {
      mounted: false,
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
    };
  }

  componentWillMount = () => {
    if (!this.state.mounted) {
      global.socket.emit('isUserLogged', this.target);
    }
    global.socket.on(`userIsLogged/${this.target}`, (statement) => {
      console.log(`RECEPTION ON ${this.target}`);
      if (!this.state.mounted) {
        this.setState({ isTargetLogged: statement, mounted: true });
      }
    });
  }

  componentWillUnmount = () => {
    global.socket.off('isUserLogged');
    global.socket.off(`userIsLogged/${this.target}`);
  }

  ConnectionDisplay = (logged) => {
    if (logged) {
      return (<div className="col flex-middle"><img src="/static/icons/Online.png" alt="" />Online</div>);
    }
    return (<div className="col flex-middle"><img src="/static/icons/Offline.png" alt="" />Offline</div>);
  };


  render() {
    const { mounted } = this.state;
    if (!mounted) return <CircularProgress />;
    const { isTargetLogged } = this.state;
    const { path, target } = this.props;
    const connection = this.ConnectionDisplay(isTargetLogged);
    const toProfile = LinkProfile(this.styles.link, target, 'toProfile');
    const toChat = `/chat/${target}`;
    return (
      <div style={this.styles.conversation_container}>
        <div style={this.styles.conversation_item}>
          <div className="container-fluid">
            <div className="row">{target}</div>
            <div className="row ">
              <div className="col"><Avatar src={path} /></div>
              {connection}
            </div>
            <div className="row ">{toProfile}</div>
            <div className="row ">
              <Link to={toChat} style={this.styles.link}>To Chat</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConversationCard;
