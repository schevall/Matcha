import React, { Component } from 'react';

class ShowAllInfoComponent extends Component {

  constructor(props) {
    super(props);
    const { lastname, email, firstname, gender, orient, geo } = props.extendedInfo;
    this.state = {
      firstname,
      lastname,
      email,
      gender,
      orient,
      geo,
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleOnSubmit(this.state);
  }

  render() {
    const { email, firstname, lastname, geo, gender, orient } = this.state;
    const tabtext = [
      { id: 1, name: 'firstname', value: firstname, text: '  : First Name' },
      { id: 2, name: 'lastname', value: lastname, text: '  : Last Name' },
      { id: 3, name: 'email', value: email, text: '  : Email' },
    ];
    const textInput = tabtext.map(data => (
      <div key={data.id} className="row">
        <label htmlFor={data.name}>
          <input type="text" id={data.name} onChange={this.handleChange} defaultValue={data.value} />
          {data.text}
        </label>
      </div>
    ));
    const selectorGender = (
      <label htmlFor="gender">Gender :
        <select id="gender" onChange={this.handleChange} defaultValue={gender}>
          <option key={1} value="male">Male</option>
          <option key={2} value="female">Female</option>
        </select>
      </label>
    );
    const selectorOrient = (
      <label htmlFor="orient">Look for :
        <select id="orient" onChange={this.handleChange} defaultValue={orient}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="both">Both</option>
        </select>
      </label>
    );
    return (
      <div className="extended-info-container">
        <div className="container">
          {textInput}
        </div>
        <div>
          {selectorGender}
        </div>
        <div>
          {selectorOrient}
        </div>
        <button type="submit" onClick={this.handleSubmit}>Submit</button>
      </div>);
  }
}

export default ShowAllInfoComponent;
