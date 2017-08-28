import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Row, Col } from 'react-bootstrap';

export default class Interactions extends Component {

  constructor(props) {
    super(props);
    const { actions } = props;
    this.state = {
      actions,
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

  ButtonMaker = (id, text, bsStyle, active = true) => {
    const button = (
      <Button
        id={id}
        style={{ width: '64px', marginLeft: '3px' }}
        onClick={this.ActionsSending}
        bsStyle={bsStyle}
        disabled={!active}
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
    return this.ButtonMaker('chat', 'Chat', 'success', false);
  }

  render() {
    const { canlike, canchat, canblock, canreport } = this.state.actions;
    const likeButton = canlike === 'disabled' ? null : this.LikeButtonMaker(canlike);
    const chatButton = this.ChatButtonMaker(canchat);
    const blockButton = canblock ? this.ButtonMaker('block', 'Block', 'warning') : this.ButtonMaker('unblock', 'Unblock', 'warning');
    const reportButton = canreport ? this.ButtonMaker('report', 'Report', 'danger') : <Button style={this.style} bsStyle="danger">Reported</Button>;

    return (
      <Row style={{ marginTop: '10px' }}>
        {likeButton}
        {chatButton}
        {blockButton}
        {reportButton}
      </Row>
    );
  }
}
