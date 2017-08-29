import React, { Component } from 'react';
import axios from 'axios';

export default class Init extends Component {

  state = { mounted: false }

  componentWillMount() {
    axios('/api/init', 'GET')
      .then(({ data }) => {
        if (data.error) {
          this.setState({ mounted: 'error' });
        } else {
          this.setState({ mounted: 'ready' });
        }
      });
  }

  render() {
    const { mounted } = this.state;
    if (mounted === 'error') {
      return <div>Error</div>;
    } else if (mounted === 'ready') {
      return <div>ready</div>;
    }
    return <div>loading</div>;
  }
}
