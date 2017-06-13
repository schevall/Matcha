import React, { Component } from 'react';
import { connect } from 'react-redux';

class MessageBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      format: '',
      message: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('in MessageBar, will receive, nextProps = ', nextProps);
    this.setState({
      format: nextProps.format,
      message: nextProps.message,
    });
    setTimeout(() => {
      this.setState({
        format: '',
        message: '',
      });
    }, 4000);
  }

  render() {
    return (
      <div>
        <p>{ this.state.message }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { messageReducer } = state;
  const { message } = messageReducer;

  return {
    message,
  };
};


export default connect(mapStateToProps)(MessageBar);
