import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { Grid, Row, Col } from 'react-bootstrap';

import secureAxios from '../secureAxios.js';
import OneGeneralInfo from './Components/OneGeneralInfo.js';
import OneMatchInfo from './Components/OneMatchInfo.js';
import OneBasicProfilCard from './Components/OneBasicProfilCard.js';
import OneBio from './Components/OneBio.js';
import OneGalleryDisplay from './Components/OneGalleryDisplay.js';

class OneProfile extends Component {

  constructor(props) {
    super(props);
    const { pathname } = props.location;
    this.targetname = pathname.substr(pathname.lastIndexOf('/') + 1);
    this.state = {
      target: null,
    };
  }

  componentWillMount = () => {
    const targetname = this.targetname;
    this.initProfile(targetname);
  }

  initProfile = (targetname) => {
    const url = `/users/getprofile/${targetname}`;
    secureAxios(url, 'GET')
      .then(({ data }) => {
        if (data.error) {
          if (data.error === 'notfound') {
            this.setState({ target: 'notfound', visitor: 'unhappy' });
          }
          if (data.error === 'block') {
            this.setState({ target: 'block', visitor: 'blocked' });
          }
        } else {
          const { target, visitor, actions } = data;
          this.setState({
            target, visitor, actions,
          });
        }
      });
  }

  render() {
    if (!this.state.target || !this.state.visitor) return <CircularProgress />;
    else if (this.state.target === 'block') return <div>Oups, it seems that user has blocked you</div>;
    else if (this.state.target === 'notfound') return <div>Oups, this user does not exist</div>;
    const { target, visitor } = this.state;
    return (
      <Grid style={{ width: '80vw' }}>
        <Row>
          <Col xs={12} sm={4} md={4} lg={3} lgOffset={2} className="border">
            <OneBasicProfilCard visitor={visitor} button target={target} />
          </Col>
          <Col xs={12} sm={4} md={4} lg={3} className="border">
            <OneGeneralInfo
              userInfo={target}
            />
          </Col>
          <Col xs={12} sm={4} md={4} lg={3} className="border" >
            <OneMatchInfo visitor={visitor} target={target} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={9} xl={8} lgOffset={2} className="border">
            <OneBio bio={target.bio} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={9} xl={8} lgOffset={2} className="border">
            Gallery
          </Col>
        </Row>
        <Row >
          <Col xs={12} sm={12} md={12} lg={9} xl={8} lgOffset={2} className="border">
            <OneGalleryDisplay
              picturesPath={target.picturesPath}
              picturesNb={target.picturesPath.length}
              username={target.username}
            />
          </Col>
        </Row>
      </Grid>

    );
  }
}

export default OneProfile;
