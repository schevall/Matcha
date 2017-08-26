import React, { Component } from 'react';

import { Button, Col, Form, FormGroup, FormControl } from 'react-bootstrap';
import Tags from '../Containers/Tags.js';
import MyGeo from '../../Geolocation/Containers/MyGeo.js';

export default class MyGeneralInfo extends Component {

  handleChange = (e) => {
    e.preventDefault();
    const field = e.target.id;
    const value = e.target.value;
    if (value.length < 25) {
      this.props.handleOnChange(field, value);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleOnSubmit();
  }

  render() {
    const { firstname, lastname, gender, orient, tags, geo } = this.props.userInfo;
    return (
      <div>
        <Form horizontal onChange={this.handleChange}>
          <FormGroup>General Informations</FormGroup>
          <FormGroup>
            <Col sm={4}>First Name</Col>
            <Col sm={6}>
              <FormControl id="firstname" type="text" placeholder="Your first name" defaultValue={firstname} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={4}>Last Name</Col>
            <Col sm={6}>
              <FormControl id="lastname" type="text" placeholder="Your last name" defaultValue={lastname} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={4}>Gender</Col>
            <Col sm={6}>
              <FormControl componentClass="select" id="gender" defaultValue={gender}>
                <option value="male">male</option>
                <option value="female">female</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={4}>Look for</Col>
            <Col sm={6}>
              <FormControl componentClass="select" id="orient" defaultValue={orient}>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="both">both</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col xs={4} xsOffset={4}><Button onClick={this.handleSubmit}>Save Change</Button></Col>
          </FormGroup>
        </Form>
        <Tags tags={tags} />
        <MyGeo geo={geo} />
      </div>);
  }
}
