import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class OneMatchInfo extends Component {

  constructor(props) {
    super(props);
    const { visitor, target } = props;
    this.state = {
      visitor,
      target
    };
    this.styles = {
      table: {
        width: '100%',
      },
    };
  }

  getCompat = (visitor, target) => {
    const targetOrient = target.orient;
    const targetGender = target.gender;
    const visitorOrient = visitor.orient;
    const visitorGender = visitor.gender;
    let error = '';
    if (targetOrient !== visitorGender && targetOrient !== 'both') error = true;
    if (visitorOrient !== targetGender && visitorOrient !== 'both') error = true;
    return (!error ? 'Possible' : 'Impossible');
  }

  getIsLiked = (visitor, target) => {
    const likesTarget = target.liketo;
    const { username } = visitor;
  };

  Row1 = (key, text, info) => {
    return (
      <Row key={key}>
        <Col key={key + 1} xs={6}>{text}</Col>
        <Col key={key + 2} xsOffset={3} xs={2}>{info}</Col>
      </Row>);
  };

  MatchCalcultor = (visitor, target) => {
    const compat = this.getCompat(visitor, target);
    const liked = this.getIsLiked(visitor, target);
    const visits = 10;
    const common = 5;
    const score = 8;
    return { compat, liked, visits, common, score };
  }
  render() {
    const { visitor, target } = this.state;
    const { compat, liked, visits, common, score } = this.MatchCalcultor(visitor, target);
    const tab = [
      { key: 0, text: 'Compatibility :', info: compat },
      { key: 3, text: 'Has liked you :', info: liked },
      { key: 6, text: 'Has visited you :', info: visits },
      { key: 9, text: 'Common Tags', info: common },
      { key: 12, text: 'Matching Score', info: score },
    ];
    const display = tab.map(data => (
      this.Row1(data.key, data.text, data.info)
    ));
    return (
      <div className="match-info-container">
        <Grid style={this.styles.table} fluid>
          <Row><Col>Matching Informations</Col></Row><br />
          {display}
        </Grid>
      </div>);
  }
}
