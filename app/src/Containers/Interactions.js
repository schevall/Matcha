import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class Interactions extends Component {

  constructor(props) {
    super(props);
    const { actions } = props;
    this.state = {
      actions,
    };
    this.style = {
      margin: '3px',
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('INTER NEXT', nextProps);
    const { actions } = nextProps;
    this.setState({ actions });
  }

  ActionsSending = (e) => {
    e.preventDefault();
    const action = e.target.id;
    this.props.handleActions(action);
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

  render() {
    const { canlike, canchat, canblock, canreport } = this.state.actions;
    console.log('INTER', this.state.actions);
    const likeButton = canlike ? this.ButtonMaker('like', 'Like', 'info') : this.ButtonMaker('unlike', 'Unlike', 'info');
    const chatButton = canchat ? this.ButtonMaker('chat', 'Chat', 'success') : null;
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
