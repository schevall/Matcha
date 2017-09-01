import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';


export default class Sorting extends Component {
  render() {
    const type = ['Age', 'Distance', 'Tags', 'Popularity', 'Matching'];
    const Buttons = type.map(el => (
      <div key={el}>
        <Button
          onClick={this.props.sort}
          id={el}
          key={el}
          style={{ margin: '3px' }}
          bsStyle="default"
        >
          {el}
        </Button>
      </div>
    ));
    const Container = (
      <Grid>
        <Row>
          <Col xs={12} md={2}>Sort by:</Col>
          { Buttons }
        </Row>
      </Grid>
    );
    return Container;
  }
}
