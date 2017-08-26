import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Button } from 'react-bootstrap';

export default class ModalBox extends React.Component {
  constructor(props) {
    super(props);
    const { email } = props;
    this.state = {
      open: false,
      password: '',
      email,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { email } = nextProps;
    this.setState({
      email,
    });
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) return null;
    this.props.handleOnSubmit(email, password);
    this.setState({
      open: false,
      password: '',
      email: '',
    });
    return null;
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        keyboardFocused
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        onTouchTap={this.handleSubmit}
      />,
    ];

    const { name } = this.props;
    const { password, email } = this.state;
    const message = 'If you change your email you will be disconnected and a new activation key will be sent';
    return (
      <div>
        <Button style={{ marginLeft: '-10px' }} type="submit" onClick={this.handleOpen}>{name}</Button>
        <Dialog
          title={name}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>{message}</p>
          <div key="password" className="row">
            <label htmlFor="password">
              <input type="password" id="password" onChange={this.handleChange} defaultValue={password} />
              : Type your password
            </label>
          </div>
          <div key="email" className="row">
            <label htmlFor="email">
              <input type="text" id="email" onChange={this.handleChange} defaultValue={email} />
              : Type your new email
            </label>
          </div>
        </Dialog>
      </div>
    );
  }
}
