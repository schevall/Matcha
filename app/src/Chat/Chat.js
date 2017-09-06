import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import secureAxios from '../secureAxios.js';
import ConversationCard from './Components/ConversationCard.js';
import { logoutAuthError } from '../Actions/Login/loginBound.js';

class Chat extends Component {

  constructor(props) {
    super(props);
    const { username } = props;
    this.styles = {
      chat_container: {
        width: '100%',
        height: '70vh',
      },
    };
    this.state = { username, mounted: false };
  }

  componentWillMount = () => {
    const url = '/chat/getAllMessage/';
    secureAxios(url, 'GET')
      .then(({ data }) => {
        if (data.error) {
          if (data.error === 'authControl') {
            this.props.dispatch(logoutAuthError('No token provided, to connect, please sign in'));
          } else {
            console.log(data.error);
          }
        } else {
          const { conversations } = data;
          this.setState({ conversations, mounted: true });
        }
      });
  }

  formatConversation = (conversations) => {
    if (!conversations) return <p>No conversations</p>;
    const output = [];
    output.push(conversations.map((el) => {
      if (el !== 'blocked') {
        const other = el.user1 !== this.state.username ? el.user1 : el.user2;
        const field = el.user1 === this.state.username ? 'newMessage1' : 'newMessage2';
        const newMessage = el[field];
        const pic = el.user1 !== this.state.username ? el.picUser1 : el.picUser2;
        const path = `/static/${other}/${pic}`;
        return (
          <ConversationCard newMessage={newMessage} target={other} path={path} />);
      }
      return null;
    }));
    const result = output.filter(n => (n !== undefined && n !== null));
    return result;
  }


  render() {
    if (!this.state.mounted) return (<CircularProgress />);
    const { conversations } = this.state;
    const output = this.formatConversation(conversations);
    return (
      <div style={this.styles.chat_container}>
        {output}
      </div>
    );
  }
}

const mapStateToProps = ({
  loginReducer: { username },
}) => ({
  username,
});

export default connect(mapStateToProps)(Chat);
