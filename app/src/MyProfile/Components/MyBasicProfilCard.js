import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import * as D from '../../ToolBox/DateTools.js';
import { CalculatePopularity } from '../../ToolBox/InteractionsTools.js';

export default class MyBasicProfilCard extends Component {

  styles = {
    username: {
      fontWeight: 700,
      fontSize: '25px',
    },
    picture: {
      margin: 'auto',
    },
    pictureContainer: {
      marginTop: '25px',
      marginBottom: '25px',
    },
  };

  ConnectionDisplay = (logged, lastConnection) => {
    const connectionTime = D.getDiffDate(lastConnection);
    if (logged) {
      const connectionTitle = (<div><span style={{ color: 'green' }} className="glyphicon glyphicon-off" /><span> Online</span></div>);
      return { connectionTitle, connectionTime };
    }
    const connectionTitle = (<div><span style={{ color: 'red' }} className="glyphicon glyphicon-off" /><span> Offline</span></div>);
    return { connectionTitle, connectionTime };
  };

  render() {
    const { lastConnection, profilePicturePath, username,
            orient, gender, birthDate } = this.props.userInfo;
    const path = profilePicturePath ? `/static/${username}/${profilePicturePath}` : null;
    const { connectionTitle, connectionTime } = this.ConnectionDisplay(true, lastConnection);
    const age = D.calculateAge(birthDate);
    const popularity = CalculatePopularity(this.props.userInfo);
    const userStyle = username.charAt(0).toUpperCase() + username.slice(1);
    return (
      <Grid fluid style={{ padding: '20px' }}>
        <Row><Col xs={12} style={this.styles.username}>{userStyle}</Col></Row>
        <Row><Col xs={6}>{connectionTitle}</Col><Col xs={6}>{connectionTime}</Col></Row>
        <Row><Col xs={6}>Age</Col><Col xs={6}>{age}</Col></Row>
        <Row><Col xs={6}>Popularity</Col><Col xs={6}>{popularity}</Col></Row>
        <Row><Col xs={6}>Gender</Col><Col xs={6}>{gender}</Col></Row>
        <Row><Col xs={6}>Look For</Col><Col xs={6}>{orient}</Col></Row>
        <Row style={this.styles.pictureContainer} className="justify-content-center">
          { path ?
            <Col style={this.styles.picture}><img src={path} alt="" /></Col>
          : <div><p style={{ fontSize: 100 }} className="glyphicon glyphicon-exclamation-sign" /><p> Add a Profile picture to enjoy Matcha !</p></div>
          }
        </Row>
      </Grid>
    );
  }
}
