import React, { Component } from 'react';
import LinkProfile from '../ToolBox/LinkProfile.js';
import { getDiffDate } from '../ToolBox/DateTools.js';

class ActivityDisplay extends Component {

  constructor() {
    super();
    this.styles = {
      button: {
        border: 'none',
        outline: 'none',
        backgroundColor: 'ligthgrey',
        color: 'white',
        borderRadius: '40px',
        fontSize: '10px',
      },
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
        <div style={this.styles.row} className="row" key={date}>
          <div className="col">{link}{message}{timeMes}</div>
        </div>);
    } return (
      <div style={this.styles.row} className="row" key={date}>
        <div className="col">{message}{link}{timeMes}</div>
      </div>);
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

  render() {
    const { activity } = this.props;
    const output = [];
    activity.map(el => (
      output.push(this.formatActivity(el))
    ));
    return <div>{output}</div>;
  }
}

export default ActivityDisplay;
