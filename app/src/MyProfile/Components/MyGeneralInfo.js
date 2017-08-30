import React, { Component } from 'react';

import { Button, Col, Form, FormGroup } from 'react-bootstrap';
import Tags from '../Tags.js';
import MyGeo from '../../Geolocation/Containers/MyGeo.js';
import MyFormGroup from '../../Layout/FormGroup.js';
import MySelectFormGroup from '../../Layout/FormGroupSelect.js';

export default class MyGeneralInfo extends Component {

  state = {
    errorlastname: '',
    errorfirstname: '',
  }

  handleChange = (e) => {
    e.preventDefault();
    const field = e.target.id;
    const value = e.target.value;
    this.setState({ errorLast: '', errorFirst: '' });
    if (value.length < 25) {
      this.props.handleOnChange(field, value);
    } else {
      const errorfield = `error${field}`;
      this.setState({ [errorfield]: 'Max Char 25' });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleOnSubmit();
  }

  render() {
    const { firstname, lastname, gender, orient, tags, geo } = this.props.userInfo;
    const { errorLast, errorFirst } = this.state;
    const sizeField = [12, 8, 6];
    const sizeText = [12, 4, 6];
    const size = { sizeField, sizeText };
    const optionsGender = [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }];
    const optionsOrient = [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }, { text: 'both', value: 'both' }];
    return (
      <div style={{ padding: '20px' }}>
        <Form horizontal onChange={this.handleChange}>
          <FormGroup>General Informations</FormGroup>
          <MyFormGroup id="firstname" type="text" text="First Name" placeholder="First name" value={firstname} error={errorFirst} size={size} />
          <MyFormGroup id="lastname" type="text" text="Last Name" placeholder="Last name" value={lastname} error={errorLast} size={size} />
          <MySelectFormGroup id="gender" text="Gender" value={gender} options={optionsGender} size={size} />
          <MySelectFormGroup id="orient" text="Orient" value={orient} options={optionsOrient} size={size} />
          <FormGroup>
            <Col xs={4} xsOffset={4}><Button onClick={this.handleSubmit}>Save Change</Button></Col>
          </FormGroup>
        </Form>
        <Tags tags={tags} />
        <br />
        <MyGeo geo={geo} />
      </div>);
  }
}
