import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';

import secureAxios from '../secureAxios.js';
import OneBasicProfilCard from '../Components/OneProfile/OneBasicProfilCard.js';


class Suggestions extends Component {

  constructor(props) {
    super(props);
    const { username } = props;
    this.state = {
      username,
      mounted: null,
    };
    this.style = {
      container: {
        display: 'flex',
      },
      card: {
        margin: '5px',
      },
    };
  }

  componentDidMount() {
    const visitorName = this.state.username;
    const url = `/users/getsuggestions/${visitorName}`;
    secureAxios(url, 'GET')
      .then(({ data }) => {
        if (data.error) {
          console.log(data.error);
        } else {
          const { suggestions, visitor } = data;
          this.setState({ mounted: true, suggestions, visitor });
        }
      });
  }

  render() {
    const { isLogged } = this.props;
    if (!isLogged) return (<Redirect to="/signin" />);
    if (!this.state.mounted) return (<CircularProgress />);
    const { suggestions, visitor } = this.state;
    const output = suggestions.map(user => (
      <OneBasicProfilCard
        isProfilePage={false}
        key={user.username}
        style={this.style.card}
        visitor={visitor}
        target={user}
        button
      />
  ));
    return (
      <div style={this.style.container}>
        {output}
      </div>
    );
  }
}

Suggestions.PropTypes = {
  isLogged: PropTypes.bool,
  username: PropTypes.string,
};

const mapStateToProps = ({
  loginReducer: { isLogged, username },
}) => ({
  isLogged,
  username,
});

export default connect(mapStateToProps)(Suggestions);
