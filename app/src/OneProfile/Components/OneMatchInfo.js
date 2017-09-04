import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { GetMatchingScore } from '../../ToolBox/MatchingTool.js';
import { getDistance, CountCommonTags, canInteract, isaMatch } from '../../ToolBox/InteractionsTools.js';

export default class OneMatchInfo extends Component {

  getIsLiked = (visitor, target) => {
    if (visitor.likedby.includes(target.username)) {
      return true;
    }
    return false;
  };

  MatchCalcultor = (visitor, target) => {
    const compat = canInteract(visitor, target) ? 'Possible' : 'Impossible';
    const liked = this.getIsLiked(visitor, target) ? 'Yes' : 'No';
    const common = CountCommonTags(target.tags, visitor.tags);
    const score = GetMatchingScore(target, visitor);
    const match = isaMatch(target, visitor) ? 'Yes' : 'No';
    const distance = `${Math.round(getDistance(target.geo, visitor.geo) / 1000)} kms`;
    return { compat, liked, common, score, match, distance };
  }
  render() {
    const { visitor, target } = this.props;
    const { compat, liked, common, score, match, distance } = this.MatchCalcultor(visitor, target);
    const tab = [
      { text: 'Compatibility :', info: compat },
      { text: 'Has liked you :', info: liked },
      { text: 'Matched ?:', info: match },
      { text: 'Common Tags', info: common },
      { text: 'Distance', info: distance },
      { text: 'Matching Score', info: score },
    ];
    const display = tab.map(data => (
      <Row key={data.text}>
        <Col xs={8}>{data.text}</Col>
        <Col xs={4}>{data.info}</Col>
      </Row>
    ));
    return (
      <Grid fluid style={{ padding: '20px' }}>
        <Row><Col>Matching Informations</Col></Row><br />
        {display}
      </Grid>
    );
  }
}
