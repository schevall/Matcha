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
      input: {
        margin: 'inherit',
        marginTop: '10px',
        backgroundColor: 'white',
      },
    };
    const { pathname } = props.location;
    const target = pathname.substr(pathname.lastIndexOf('/') + 1);
    this.state = { username, target, mounted: false, input: '' };
  }

  componentWillMount = () => {
    const { target } = this.state;
    const url = `/users/getMessage/${target}`;
    secureAxios(url, 'GET')
      .then(({ data }) => {
        if (data.error) {
          this.setState({ mounted: true });
          console.log(data.error);
        } else {
          const { message } = data;
          this.setState({ message, mounted: true });
          console.log('resp ', data);
        }
      });
  }

  handleChange = (e) => {
    e.preventDefault();
    console.log('event', e.target.value);
    const input = e.target.value;
    this.setState({ input });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { input, target } = this.state;
    if (!input) return;
    const payload = { target, input };
    this.setState({ input: '' });
    secureAxios('/chat/newMessage', 'POST', payload)
      .then(({ data }) => {
        if (data.error) console.log(data.error);
        else {
          console.log('data from chat', data);
        }
      });
  }

  formatMessage = (message) => {
    if (!message) return <p>No messages</p>;
    const output = [];
    return output;
  }


  render() {
    const { isLogged } = this.props;
    if (!isLogged) return (<Redirect to="/signin" />);
    if (!this.state.mounted) return (<CircularProgress />);
    const { message, input } = this.state;
    const history = this.formatMessage(message);
    return (
      <div>
        <div className="chat_container" style={this.styles.container}>
          {history}
        </div>
        <div className="input-group">
          <input onChange={this.handleChange} type="text" className="form-control" placeholder="Type something" />
          <span className="input-group-btn">
            <button onClick={this.handleSubmit} className="btn btn-default" type="button">Go!</button>
          </span>
        </div>
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
