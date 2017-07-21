import React, { Component } from 'react';
import { connect } from 'react-redux';
import { activation } from '../Actions/Login/loginBound.js';

class Activation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activated: props.activated,
      activationkey: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activated: nextProps.activated,
    });
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { activationkey } = this.state;
    console.log('key = ', activationkey);
    if (activationkey) {
      this.props.dispatch(activation({ activationkey }));
    }
  }

  render() {
    console.log('activation', this.state);
    const { activated } = this.state;
    return activated ? null :
    <div className="activation-container">
      <label htmlFor="activation">
        <span>Enter your activation key</span>
        <input id="activationkey" type="password" onChange={this.handleChange} />
      </label>
      <button type="submit" onClick={this.handleSubmit}>Submit</button>
    </div>;
  }
}

const mapStateToProps = ({
  loginReducer: { activated },
  notifications,
}) => ({
  activated,
  notifications,
});
export default connect(mapStateToProps)(Activation);
