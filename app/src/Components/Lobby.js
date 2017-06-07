import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Lobby extends Component {

  handleClick = () => {
    axios.get('/api/lobby')
      .then(({ data }) => {
        this.setState({ message: data });
      });
  };


  render() {
    console.log('props in lobby= ', this.props);
    const { loggedUser } = this.props;
    console.log('in lobby token = ', localStorage.getItem('loggedUser'));
    const tokenUser = localStorage.getItem('loggedUser');
    return (
      <div>
        <h2>Connected</h2>
        <h3>Hello store loggedUser: {loggedUser}</h3>
        <h3>Hello token loggedUser: {tokenUser}</h3>
        <button onClick={this.handleClick} type="submit">show me magic</button> <br />
        {this.state && <p>{this.state.message}</p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loginreducer } = state;
  const { isLogged, loggedUser } = loginreducer;

  return {
    isLogged,
    loggedUser,
  };
};

export default connect(mapStateToProps)(Lobby);
