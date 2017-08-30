import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import LinkProfile from '../../ToolBox/LinkProfile.js';
import { getDiffDate } from '../../ToolBox/DateTools.js';

class ActivityDisplay extends Component {

  constructor() {
    super();
    this.state = { open: false };
    this.styles = {
      row: {
        padding: '4px',
      },
    };
    this.likeMes = ' has liked you !';
    this.unlikeMes = ' has unliked you =/';
    this.visitMes = ' has visited your profile !';
    this.matchMes = 'You have matched with ';
    this.unmatchMes = 'You have unmatched with ';
    this.blockMes = ' has blocked you =/';
    this.unblockMes = ' has unblocked you !';
  }

  likeFormat = (username, date, yes) => {
    const message = yes ? this.likeMes : this.unlikeMes;
    const link = LinkProfile(null, username);
    const time = getDiffDate(date);
    const timeMes = ` (${time} ago)`;
    return (<p key={date}>{link}{message}{timeMes}</p>);
  };

  visitFormat = (username, date) => {
    const message = this.visitMes;
    const link = LinkProfile(null, username);
    const time = getDiffDate(date);
    const timeMes = ` (${time} ago)`;
    return (
      <div style={this.styles.row} className="row" key={date}><div className="col">{link}{message}{timeMes}</div></div>);
  };

  matchFormat = (username, date, yes) => {
    const message = yes ? this.matchMes : this.unmatchMes;
    const link = LinkProfile(null, username);
    const time = getDiffDate(date);
    const timeMes = ` (${time} ago)`;
    return (<p key={date}>{message}{link}{timeMes}</p>);
  };

  blockFormat = (username, date, yes) => {
    const message = yes ? this.blockMes : this.unblockMes;
    const link = LinkProfile(null, username);
    const time = getDiffDate(date);
    const timeMes = ` (${time} ago)`;
    return (<p key={date}>{link}{message}{timeMes}</p>);
  };

  Format = (el, message, type) => {
    const { author, date } = el;
    const link = LinkProfile(null, author);
    const time = getDiffDate(date);
    const timeMes = ` (${time} ago)`;
    if (type === 1) {
      return (
        <Row style={this.styles.row} key={date}>
          <Col>{link}{message}{timeMes}</Col>
        </Row>);
    } return (
      <Row style={this.styles.row} key={date}>
        <Col>{message}{link}{timeMes}</Col>
      </Row>);
  }

  formatActivity = (el) => {
    const { event } = el;
    if (event === 'like') return this.Format(el, this.likeMes, 1);
    else if (event === 'unlike') return this.Format(el, this.unlikeMes, 1);
    else if (event === 'visit') return this.Format(el, this.visitMes, 1);
    else if (event === 'match') return this.Format(el, this.matchMes, 2);
    else if (event === 'unmatch') return this.Format(el, this.unmatchMes, 2);
    else if (event === 'block') return this.Format(el, this.blockMes, 1);
    else if (event === 'unblock') return this.Format(el, this.unblockMes, 1);
    return null;
  };

  handleClick = (e) => {
    e.preventDefault();
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { activity, oldactivity } = this.props;
    const { open } = this.state;
    const activityData = [];
    const oldActivityData = [];
    activity.map(el => (
      activityData.push(this.formatActivity(el))
    ));
    oldactivity.map(el => (
      oldActivityData.push(this.formatActivity(el))
    ));
    if (!activity || activity === undefined || !activity.length) {
      activityData[0] =
        (<Row key="activity">
          <Col>No new activity to show</Col>
        </Row>);
    }
    if (open) {
      return (
        <Grid style={{ width: '80vw' }}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={9} lgOffset={2} className="border">
              <Row>
                <button onClick={this.handleClick}>
                  Show recent activity
                </button>
              </Row>
              {oldActivityData}
            </Col>
          </Row>
        </Grid>
      );
    }
    return (
      <Grid style={{ width: '80vw' }}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={9} lgOffset={2} className="border">
            <Row>
              <button onClick={this.handleClick}>
                Show old activity
              </button>
            </Row>
            {activityData}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default ActivityDisplay;
