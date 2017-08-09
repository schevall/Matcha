import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';

import secureAxios from '../secureAxios.js';

class Chat extends Component {

  constructor(props) {
    super(props);
    const { username } = props;
    this.styles = {
      container: {
        width: '100%',
        height: '70vh',
        backgroundColor: 'white',
      },
    };
    this.state = { username, mounted: false };
  }

  componentWillMount = () => {
    const url = '/users/getAllMessage/';
    secureAxios(url, 'GET')
      .then(({ data }) => {
        if (data.error) {
          this.setState({ mounted: true });
          console.log(data.error);
        } else {
          const { conversation } = data;
          this.setState({ conversation, mounted: true });
          console.log('resp ', data);
        }
      });
  }

  formatConversation = (conversations) => {
    if (!conversations) return <p>No conversations</p>;
    const output = [];
    return output;
  }


  render() {
    const { isLogged } = this.props;
    if (!isLogged) return (<Redirect to="/signin" />);
    if (!this.state.mounted) return (<CircularProgress />);
    const { conversation } = this.state;
    const output = this.formatConversation(conversation);
    return (
      <div className="chat_container" style={this.styles.container}>
        {output}
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
