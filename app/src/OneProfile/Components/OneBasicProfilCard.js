import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import Notifications from 'react-notification-system-redux';
import CircularProgress from 'material-ui/CircularProgress';
import secureAxios from '../../secureAxios.js';
import Interactions from '../Interactions.js';
import LinkProfile from '../../ToolBox/LinkProfile.js';
import * as D from '../../ToolBox/DateTools.js';
import * as I from '../../ToolBox/InteractionsTools.js';
import { GetMatchingScore } from '../../ToolBox/MatchingTool.js';
import { logoutAuthError } from '../../Actions/Login/loginBound.js';


class OneBasicProfilCard extends Component {

  constructor(props) {
    super(props);
    const { isProfilePage, visitor, button, target } = props;
    const actions = this.GetPossibleActions(target, visitor);
    const canSeeProfile = I.canSee(visitor, target);
    this.state = {
      isProfilePage,
      canSeeProfile,
      isUserLogged: 'loading',
      visitor,
      button,
      target,
      actions,
      tochat: false,
    };
    this.styles = {
      link: {
        fontWeight: 700,
        fontSize: '25px',
        pointerEvents: 'true',
        color: 'inherit',
        textDecoration: 'none',
      },
      picture: {
        margin: 'auto',
      },
      pictureContainer: {
        marginTop: '25px',
        marginBottom: '25px',
      },
    };
    if (isProfilePage) this.styles.link.pointerEvents = 'none';
  }

  componentWillMount() {
    const targetName = this.state.target.username;
    if (this.state.isUserLogged === 'loading') {
      global.socket.emit('isUserLogged', targetName);
    }
    global.socket.on(`userIsLogged/${targetName}`, (statement) => {
      if (this.state.isUserLogged === 'loading') {
        this.setState({ isUserLogged: statement });
      }
    });
    global.socket.on(`match/${targetName}`, () => {
      const { actions } = this.state;
      actions.canchat = true;
      this.setState({ actions });
    });
    global.socket.on(`unmatch/${targetName}`, () => {
      const { actions } = this.state;
      actions.canchat = false;
      this.setState({ actions });
    });
    global.socket.on(`block/${targetName}`, () => {
      const { actions } = this.state;
      actions.canchat = false;
      this.setState({ canSeeProfile: false, actions });
    });
    global.socket.on(`unblock/${targetName}`, () => {
      this.setState({ canSeeProfile: true });
    });
  }

  componentWillUnmount = () => {
    const { username } = this.state.target;
    global.socket.off('isUserLogged');
    global.socket.off(`userIsLogged/${username}`);
    global.socket.off(`match/${username}`);
    global.socket.off(`unmatch/${username}`);
    global.socket.off(`block/${username}`);
    global.socket.off(`unblock/${username}`);
  }

  ConnectionDisplay = (logged, lastConnection) => {
    const connectionTime = D.getDiffDate(lastConnection);
    if (logged) {
      const connectionTitle = (<div><span style={{ color: 'green' }} className="glyphicon glyphicon-off" /><span> Online</span></div>);
      return { connectionTitle, connectionTime };
    }
    const connectionTitle = (<div><span style={{ color: 'red' }} className="glyphicon glyphicon-off" /><span> Offline</span></div>);
    return { connectionTitle, connectionTime };
  };

  GetPossibleActions = (target, visitor) => {
    const actions = {};
    actions.canInteract = I.canInteract(target, visitor);
    actions.canlike = !I.hasLiked(target, visitor);
    actions.canchat = I.isaMatch(target, visitor);
    actions.canblock = !I.hasBlocked(target, visitor);
    if (!actions.canblock) {
      actions.canlike = 'disabled';
      actions.canchat = false;
    }
    actions.canreport = !I.hasReported(target, visitor);
    return actions;
  }

  ProfilePictureDisplay = (username, profilePicturePath) => {
    if (profilePicturePath) {
      const path = `/static/${username}/${profilePicturePath}`;
      const info = '';
      return { path, info };
    }
    const path = '/static/icons/ic_face_black_36dp_2x.png';
    const info = 'Add a profile picture !';
    return { path, info };
  };


  SendActions = (button, action) => {
    const visitor = this.state.visitor.username;
    const target = this.state.target.username;
    if (action === 'chat') {
      this.setState({ tochat: true });
    } else {
      const payload = { visitor, target, action };
      secureAxios(`/interactions/${action}`, 'POST', payload)
        .then(({ data }) => {
          if (data.error) {
            if (data.error === 'authControl') {
              this.props.dispatch(logoutAuthError('No token provided, to connect, please sign in'));
            } else {
              this.props.dispatch(Notifications.error({ title: data.message }));
            }
          } else {
            global.socket.emit(action, target);
            const { newactions, message } = data;
            if (newactions.canchat !== 'disabled' && newactions.canchat !== undefined && newactions.canchat) global.socket.emit('match', target);
            if (newactions.canchat !== undefined && !newactions.canchat) global.socket.emit('unmatch', target);
            const { actions } = this.state;
            Object.keys(actions).forEach((key) => {
              if (newactions[key] !== undefined) {
                actions[key] = newactions[key];
              }
            });
            this.setState({
              actions,
            });
            button.disabled = false;
            this.props.dispatch(Notifications.success({ title: message }));
          }
        });
    }
  }

  render() {
    const { isUserLogged } = this.state;
    if (isUserLogged === 'loading') return <CircularProgress />;
    if (this.state.tochat) {
      const room = `/chat/${this.state.target.username}`;
      return <Redirect to={room} />;
    }
    const { lastConnection, profilePicturePath, username,
            orient, gender, birthDate } = this.state.target;
    const { button, actions, canSeeProfile } = this.state;
    const { path } = this.ProfilePictureDisplay(username, profilePicturePath);
    const {
      connectionTime,
      connectionTitle } = this.ConnectionDisplay(isUserLogged, lastConnection);
    const age = D.calculateAge(birthDate);
    const toProfile = LinkProfile(this.styles.link, username);
    const commonTags = I.CountCommonTags(this.state.target.tags, this.state.visitor.tags);
    const distance = I.getDistance(this.state.visitor.geo, this.state.target.geo);
    const text = distance >= 1000 ? `${parseInt(distance / 1000, 10)} Km` : `${distance} meters`;
    const popularity = I.CalculatePopularity(this.state.target);
    const matchingScore = GetMatchingScore(this.state.target, this.state.visitor);
    return (
      !canSeeProfile ? null :
      <Grid fluid style={{ padding: '20px' }}>
        <Row><Col xs={12} style={this.styles.username}>{toProfile}</Col></Row>
        <Row><Col xs={6}>{connectionTitle}</Col><Col xs={6}>{connectionTime}</Col></Row>
        <Row><Col xs={6}>Age</Col><Col xs={6}>{age}</Col></Row>
        <Row><Col xs={6}>Popularity</Col><Col xs={6}>{popularity}</Col></Row>
        <Row><Col xs={6}>Gender</Col><Col xs={6}>{gender}</Col></Row>
        <Row><Col xs={6}>Look For</Col><Col xs={6}>{orient}</Col></Row>
        <Row><Col xs={6}>Tag in common</Col><Col xs={6}>{commonTags}</Col></Row>
        <Row><Col xs={6}>Distance</Col><Col xs={6}>{text}</Col></Row>
        <Row><Col xs={6}>Matching</Col><Col xs={6}>{matchingScore}</Col></Row>
        <Row style={this.styles.pictureContainer} className="justify-content-center">
          <Col style={this.styles.picture}>
            <img src={path} alt="" />
          </Col>
        </Row>
        { (!button || !actions.canInteract) ? null :
        <Interactions actions={actions} handleActions={this.SendActions} />
        }
      </Grid>
    );
  }
}

const mapStateToProps = ({
  notifications,
}) => ({
  notifications,
});

export default connect(mapStateToProps)(OneBasicProfilCard);
