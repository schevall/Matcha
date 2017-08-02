import React, { Component } from 'react';
import OneTag from './OneTag.js';

export default class OneGeneralInfo extends Component {

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

  render() {
    const { firstname, lastname, gender, orient, tags } = this.state;
    const tabtext = [
      { id: 1, name: 'firstname', value: firstname, text: 'First Name :  ' },
      { id: 2, name: 'lastname', value: lastname, text: 'Last Name :  ' },
    ];
    const textInput = tabtext.map(data => (
      <div key={data.id} className="row">
        <label htmlFor={data.name}>
          {data.text} {data.value}
        </label>
      </div>
    ));
    const selectorGender = (
      <label htmlFor="gender"><span>Gender : </span>
        {gender}
      </label>
    );
    const selectorOrient = (
      <label htmlFor="orient"><span>Look for : </span>
        {orient}
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
        <div> <br />
          <p>Tags :</p>
          <OneTag tags={tags} />
        </div>
      </div>);
  }
}
