import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import OneTag from './OneTag.js';

const OneGeneralInfo = (props) => {
  const { firstname, lastname, gender, orient, tags } = props.userInfo;
  const tab = [
    { text: 'First name', value: firstname },
    { text: 'Last name', value: lastname },
    { text: 'Gender', value: gender },
    { text: 'Look for', value: orient },
  ];
  const display = tab.map(el => (
    <Row key={el.text}><Col xs={6}>{el.text}</Col><Col xs={6}>{el.value}</Col></Row>
  ));
  return (
    <Grid fluid style={{ padding: '20px' }}>
      <Row><Col>General Informations</Col></Row>
      {display}
      <br />
      <Row> Tags
        <OneTag tags={tags} />
      </Row>
    </Grid>
  );
};

export default OneGeneralInfo;
