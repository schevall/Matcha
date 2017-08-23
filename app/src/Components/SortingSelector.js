import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';


export default class SortingSelector extends Component {
  render() {
    const type = ['Age', 'Distance', 'Tags', 'Popularity', 'Matching'];
    const Buttons = type.map(el => (
      <Button
        onClick={this.props.filter}
        id={el}
        key={el}
        style={{ margin: '3px' }}
        bsStyle="default"
      >
        {el}
      </Button>
    ));
    const Container = (
      <div style={{ margin: 'auto', width: '50%' }}> Sort by:
        { Buttons }
      </div>
    );
    return Container;
  }
}
