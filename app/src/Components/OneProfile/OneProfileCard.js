import React, { Component } from 'react';
import OneGeneralInfo from './OneGeneralInfo.js';
import OneMatchInfo from './OneMatchInfo.js';
import OneBasicProfilCard from './OneBasicProfilCard.js';
import OneBio from './OneBio.js';

class OneProfileCard extends Component {

  constructor(props) {
    super(props);
    const { target, visitor } = props;
    console.log('PROPS', props);
    this.state = {
      target,
      visitor,
    };
  }

  render() {
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
