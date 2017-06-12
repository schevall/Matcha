import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Logout from './Logout';

class authtest extends Component {

  handleClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      this.setState({ message: 'no token provided' });
      return;
    }
    axios.post('/api/lobby/test', { token })
      .then(({ data }) => {
        if (data.error) {
          this.setState({ message: data.message });
        } else {
          this.setState({ message: 'test passed' });
        }
      });
  };


  render() {
    const { loggedUser } = this.props;
    const tokenUser = localStorage.getItem('loggedUser');
    return (
      <div>
        <a href="/signin">back</a>
        <h2>Connected</h2>
        <h3>Hello store loggedUser: {loggedUser}</h3>
        <h3>Hello token loggedUser: {tokenUser}</h3>
        <button onClick={this.handleClick} type="submit">show me magic</button> <br />
        <Logout />
        {this.state && <p>{this.state.message}</p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('in authtest, state = ', state);
  const { loginReducer } = state;
  const { loggedUser } = loginReducer;

  return {
    loggedUser,
  };
};

export default connect(mapStateToProps)(authtest);
