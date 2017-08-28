import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';


export default class SortingSelector extends Component {
  render() {
    const type = ['Age', 'Distance', 'Tags', 'Popularity', 'Matching'];
    const Buttons = type.map(el => (
      <Col>
        <Button
          onClick={this.props.filter}
          id={el}
          key={el}
          style={{ margin: '3px' }}
          bsStyle="default"
        >
          {el}
        </Button>
      </Col>
    ));
    const Container = (
      <Grid fluid>
        <Row>
          <Col>Sort by:</Col>
          { Buttons }
        </Row>
      </Grid>
    );
    return Container;
  }
}
