import React, { Component } from 'react';
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';
import ModalBox from '../../ToolBox/Modal_box.js';


class ProtectedInfo extends Component {

  constructor(props) {
    super(props);
    const { email } = props;
    this.state = {
      modal: false,
      email,
      oldpassword: '',
      password: '',
      password2: '',
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmitPassword = (e) => {
    e.preventDefault();
    const { password, password2, oldpassword } = this.state;
    if (!password || !password2 || !oldpassword) return null;
    if (password !== password2) {
      const title = 'Passwords do not match !';
      this.props.dispatch(Notifications.error({ title }));
    } else if (password === oldpassword) {
      const title = 'Old and new password are the same !';
      this.props.dispatch(Notifications.error({ title }));
    } else {
      const payload = { password, password2, oldpassword };
      this.props.handlePasswordModif(payload);
      this.setState({ oldpassword: '', password: '', password2: '' });
    }
    return null;
  }

  handleSubmitEmail = (email, password) => {
    if (!email || !password) return null;
    this.props.handleEmailModif(email, password);
    return null;
  }

  render() {
    const { email, password, password2, oldpassword } = this.state;
    const tabtext = [
      { id: 1, name: 'oldpassword', value: oldpassword, text: '  : Old password' },
      { id: 2, name: 'password', value: password, text: '  : New password' },
      { id: 3, name: 'password2', value: password2, text: '  : Retype new password' },
    ];
    const privateInput = tabtext.map(data => (
      <div key={data.id} className="row">
        <label htmlFor={data.name}>
          <input type="password" id={data.name} onChange={this.handleChange} defaultValue={data.value} />
          {data.text}
        </label>
      </div>
    ));
    const emailInput = (
      <div key="email" className="row">
        <label htmlFor="email">
          <input type="text" id="email" onChange={this.handleChange} defaultValue={email} />
          : Your email
        </label>
      </div>);
    return (
      <div className="extended-info-container">
        <p>Private Informations</p>
        <div className="container">
          {privateInput}
        </div>
        <button type="submit" onClick={this.handleSubmitPassword}>Save Change</button>
        <br />
        <br />
        <div className="container">
          {emailInput}
        </div>
        <ModalBox name="Save Change" email={this.state.email} handleOnSubmit={this.handleSubmitEmail} />
      </div>);
  }
}

const mapStateToProps = ({
  notifications,
}) => ({
  notifications,
});


export default connect(mapStateToProps)(ProtectedInfo);
