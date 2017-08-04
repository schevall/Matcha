import React, { Component } from 'react';
import MyTag from './MyTag.js';
import MyGeo from './MyGeo.js';

export default class MyGeneralInfo extends Component {

  constructor(props) {
    super(props);
    const { lastname, firstname, gender, orient, geo, tags } = props.extendedInfo;
    this.state = {
      firstname,
      lastname,
      gender,
      orient,
      geo,
      tags,
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
    const { firstname, lastname, gender, orient, tags, geo } = this.state;
    const tabtext = [
      { id: 1, name: 'firstname', value: firstname, text: '  : First Name' },
      { id: 2, name: 'lastname', value: lastname, text: '  : Last Name' },
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
        <p>General Informations</p>
        <div className="container">
          {textInput}
        </div>
        <div>
          {selectorGender}
        </div>
        <div>
          {selectorOrient}
        </div>
        <button type="submit" onClick={this.handleSubmit}>Save Change</button>
        <div> <br />
          <p>Your tags :</p>
          <MyTag tags={tags} handleOnSubmit={this.props.handleOnSubmitTags} />
        </div> <br />
        <MyGeo geo={geo} />
      </div>);
  }
}
