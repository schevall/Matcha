import React, { Component } from 'react';
import { Button, Col, Form, FormGroup } from 'react-bootstrap';
import MyFormGroup from '../../Layout/FormGroup.js';


class ProtectedInfo extends Component {

  constructor(props) {
    super(props);
    const { email } = props;
    this.state = {
      email,
      oldpassword: '',
      password: '',
      password2: '',
      errorOldpass: '',
      errorNewPass: '',
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      errorNewPass: '',
      errorOldpass: '',
      errorEmail: '',
      [e.target.id]: e.target.value,
    });
  }

  handleSubmitPassword = (e) => {
    e.preventDefault();
    const { password, password2, oldpassword } = this.state;
    if (!password || !password2 || !oldpassword) {
      this.setState({ errorOldpass: 'Please fill all the fields' });
    } else if (password !== password2) {
      this.setState({ errorNewPass: 'New password fields don\'t match' });
    } else if (password === oldpassword) {
      this.setState({ errorNewPass: 'Old password and new password are the same' });
    } else {
      const payload = { password, password2, oldpassword };
      this.props.handlePasswordModif(payload);
      this.setState({ oldpassword: '', password: '', password2: '' });
    }
    return null;
  }

  handleSubmitEmail = () => {
    const { email } = this.state;
    if (!email) {
      this.setState({ errorEmail: 'Please fill all the fields' });
    } else {
      this.props.handleEmailModif(email);
    }
  }

  render() {
    const { email, errorOldpass, errorNewPass, errorEmail } = this.state;
    const sizeField = [8, 8, 8];
    const size = { sizeField };
    return (
      <div style={{ padding: '20px' }}>
        <Form horizontal onChange={this.handleChange}>
          <FormGroup>Security settings: Email and password</FormGroup>
          <MyFormGroup id="oldpassword" type="password" placeholder="Old password" error={errorOldpass} size={size} />
          <MyFormGroup id="password" type="password" placeholder="New password" error={errorNewPass} size={size} />
          <MyFormGroup id="password2" type="password" placeholder="Retype the new password" size={size} />
          <FormGroup>
            <Col xs={4}><Button onClick={this.handleSubmitPassword}>Save Change</Button></Col>
          </FormGroup>
        </Form>
        <br />
        <Form horizontal onChange={this.handleChange}>
          <MyFormGroup id="email" type="email" placeholder="Type your email" error={errorEmail} value={email} size={size} />
          <FormGroup>
            <Col xs={4}><Button onClick={this.handleSubmitEmail}>Save Change</Button></Col>
          </FormGroup>
        </Form>
      </div>);
  }
}

export default ProtectedInfo;
