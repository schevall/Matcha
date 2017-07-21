import React, { Component } from 'react';

const style = {
  input: {
    marginRight: 5,
  },
};

class MyRadioButton extends Component {

  constructor(props) {
    super(props);
    if (props.label === props.current) {
      this.state = {
        checked: true,
      };
    } else {
      this.state = {
        checked: false,
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    const { current, label } = nextProps;
    if (current === label) {
      this.setState({
        checked: true,
      });
    } else {
      this.setState({
        checked: false,
      });
    }
  }

  handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.id;
    this.props.handleChange(field, value);
  }

  render() {
    const { label, name } = this.props;
    return (
      <div>
        <input
          style={style.input}
          name={name}
          id={label}
          type="radio"
          onChange={this.handleChange}
          checked={this.state.checked}
        />
        <span>{label}</span>
      </div>);
  }
}


export default MyRadioButton;
