import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Notifications from 'react-notification-system-redux';

const style = {
  margin: 12,
};

class NewPassword extends Component {

  state = {
    username: '',
    email: '',
    errorusername: '',
    erroremail: '',
  }

  handleChange = (e) => {
    e.preventDefault();
    const field = `error${e.target.name}`;
    this.setState({
      [e.target.name]: e.target.value,
      [field]: '',
    });
  }

  reset = (e) => {
    e.preventDefault();
    const { email, username } = this.state;
    if (!email) {
      this.setState({ erroremail: 'This field is required' });
    }
    if (!username) {
      this.setState({ errorusername: 'This field is required' });
    }
    if (email && username) {
      axios.post('/api/resetPassword', { email, username })
      .then(({ data }) => {
        if (data.error) {
          this.props.dispatch(Notifications.error({ title: data.message }));
        } else {
          const title = 'A new password has been sent to your email';
          this.props.dispatch(Notifications.success({ title }));
          this.props.history.push('/signin');
        }
      });
    }
  }

  render() {
    console.log('This state', this.state);
    return (
      <div style={{ backgroundColor: 'white', padding: '20px' }} className="border">
        <Link to="/signin">To Signin</Link>
        <br />
        <Link to="/signup">To Signup</Link>
        <br />
        <form onSubmit={this.handleSubmit}>
          <h4>Get a new Password</h4>
          <TextField
            style={style}
            name="username"
            type="text"
            hintText="Type your username"
            floatingLabelText="Username"
            value={this.state.username}
            onChange={this.handleChange}
            errorText={this.state.errorusername}
            required
          />
          <br />
          <TextField
            style={style}
            name="email"
            type="email"
            hintText="Type your Email"
            floatingLabelText="Email"
            value={this.state.email}
            onChange={this.handleChange}
            errorText={this.state.erroremail}
            required
          /><br />
          <RaisedButton
            style={style}
            label="Reset"
            onClick={this.reset}
            primary
          />
        </form>
      </div>
    );
  }
}

export default connect()(NewPassword);
