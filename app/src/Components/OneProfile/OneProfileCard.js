import React, { Component } from 'react';
import OneGeneralInfo from './OneGeneralInfo.js';
import OneMatchInfo from './OneMatchInfo.js';
import OneBasicProfilCard from './OneBasicProfilCard.js';
import OneBio from './OneBio.js';

class OneProfileCard extends Component {

  constructor(props) {
    super(props);
    console.log('IN ONE PROFILE CARD CONTRUCT');
    const { target, visitor } = props;
    this.state = {
      target,
      visitor,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('NEXT PROPS IN ONE PROFILE CARD', nextProps);
  }

  render() {
    console.log('IN ONE PROFILE CARD RENDER');
    const { visitor, target } = this.state;
    const button = (target.username !== visitor.username);
    return (
      <div className="profile_container">
        <div className="profile_container_sub">
          <OneBasicProfilCard visitor={visitor} button={button} target={target} />
          <OneGeneralInfo
            extendedInfo={target}
          />
          <OneMatchInfo visitor={visitor} target={target} />
        </div>
        <OneBio bio={target.bio} />
      </div>
    );
  }
}

export default OneProfileCard;
