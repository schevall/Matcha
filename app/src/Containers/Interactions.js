import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class Interactions extends Component {

  constructor(props) {
    super(props);
    const { actions } = props;
    console.log('Interactions', actions);
    this.state = {
      actions,
    };
    this.style = {
      margin: '3px',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { actions } = nextProps;
    this.setState({ actions });
  }

  ActionsSending = (e) => {
    e.preventDefault();
    const action = e.target.id;
    const button = e.target;
    button.disabled = true;
    this.props.handleActions(button, action);
  }

  ButtonMaker = (id, text, bsStyle) => {
    const button = (
      <Button
        onClick={this.ActionsSending}
        id={id}
        style={this.style}
        bsStyle={bsStyle}
      >
        {text}
      </Button>
    );
    return button;
  }

  LikeButtonMaker = (canlike) => {
    if (canlike) {
      return this.ButtonMaker('like', 'Like', 'info');
    }
    return this.ButtonMaker('unlike', 'Unlike', 'info');
  }

  ChatButtonMaker = (canchat) => {
    if (canchat && canchat !== 'disabled') {
      return this.ButtonMaker('chat', 'Chat', 'success');
    }
    return null;
  }

  render() {
    const { canlike, canchat, canblock, canreport } = this.state.actions;
    console.log('ACTION ', this.state.actions);
    const likeButton = canlike === 'disabled' ? null : this.LikeButtonMaker(canlike);
    const chatButton = this.ChatButtonMaker(canchat);
    const blockButton = canblock ? this.ButtonMaker('block', 'Block', 'warning') : this.ButtonMaker('unblock', 'Unblock', 'warning');
    const reportButton = canreport ? this.ButtonMaker('report', 'Report', 'danger') : <Button style={this.style} bsStyle="danger">Reported</Button>;

    return (
      <div className="profile_action_container">
        {likeButton}
        {chatButton}
        {blockButton}
        {reportButton}
      </div>
    );
  }
}
