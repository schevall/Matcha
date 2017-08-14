import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import Button from 'react-bootstrap/lib/Button';
import secureAxios from '../secureAxios.js';
import OneBasicProfilCard from '../Components/OneProfile/OneBasicProfilCard.js';
import { GetMatchingScore } from '../ToolBox/MatchingTool.js';
import { calculateAge } from '../ToolBox/DateTools.js';
import { getDistance, CountCommonTags, CalculatePopularity } from '../ToolBox/InteractionsTools.js';
import AdvancedFilterSelector from '../Components/AdvancedFilter.js';


const SortingButton = (filter) => {
  const type = ['Age', 'Distance', 'Tags in Common', 'Popularity', 'Matching Score'];
  const Buttons = type.map(el => (
    <Button
      onClick={filter}
      id={el}
      key={el}
      style={{ margin: '3px' }}
      bsStyle="default"
    >
      {el}
    </Button>
  ));
  const Container = (
    <div style={{ margin: 'auto', width: '50%' }}> Sort by:
      { Buttons }
    </div>
  );
  return Container;
};

class Suggestions extends Component {

  constructor(props) {
    super(props);
    const { username } = props;
    this.state = {
      username,
      mounted: null,
      sorting: null,
      rev: 1,
      advancedSorting: null,
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
          console.log('RESP FROM SUGGES', suggestions);
          this.sortSuggestions(suggestions, visitor);
        }
      });
  }

  sortSuggestions = (suggestions = [], visitor) => {
    const sorted = suggestions.sort((a, b) => {
      const aPoints = GetMatchingScore(a, visitor);
      const bPoints = GetMatchingScore(b, visitor);
      if (aPoints < bPoints) return 1;
      if (aPoints > bPoints) return -1;
      return 0;
    });
    this.setState({ mounted: true, suggestions: sorted, visitor });
  }

  sortBy = (sorting, rev) => {
    const { suggestions } = this.state;
    const v = this.state.visitor;
    const sorted = suggestions.sort((a, b) => {
      if (sorting === 'Age') {
        const diff = rev * (calculateAge(a.birthDate) - calculateAge(b.birthDate));
        return diff >= 1 ? 1 : -1;
      }
      else if (sorting === 'Distance') {
        const diff = rev * (getDistance(a.geo, v.geo) - getDistance(b.geo, v.geo));
        return diff >= 1 ? 1 : -1;
      }
      else if (sorting === 'Tags in Common') {
        const diff = rev * (CountCommonTags(a.tags, v.tags) - CountCommonTags(b.tags, v.tags));
        return diff >= 1 ? 1 : -1;
      }
      else if (sorting === 'Popularity') {
        const diff = rev * (CalculatePopularity(a) - CalculatePopularity(b));
        return diff >= 1 ? 1 : -1;
      }
      else if (sorting === 'Matching Score') {
        const diff = rev * (GetMatchingScore(a, v) - GetMatchingScore(b, v));
        return diff >= 1 ? 1 : -1;
      }
      return 0;
    });
    console.log('SORTED', sorted);
    this.setState({ suggestions: sorted, sorting, rev });
  }

  filter = (e) => {
    e.preventDefault();
    console.log('TWSR', e.target.id);
    const newsorting = e.target.id;
    const { sorting, rev } = this.state;
    const type = ['Age', 'Distance', 'Tags in Common', 'Popularity', 'Matching Score'];
    if (type.includes(newsorting)) {
      if (newsorting === sorting && rev === -1) this.sortBy(newsorting, 1);
      else if (newsorting === sorting && rev === 1) this.sortBy(newsorting, -1);
      else this.sortBy(newsorting, 1);
    }
  }

  advancedFilter = () => {
    console.log('here');
  }

  render() {
    const { isLogged } = this.props;
    if (!isLogged) return (<Redirect to="/signin" />);
    if (!this.state.mounted) return (<CircularProgress />);
    const { suggestions, visitor } = this.state;
    const sorting = SortingButton(this.filter);
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
      <div>
        <AdvancedFilterSelector filter={this.advancedFilter} />
        {sorting}
        <div style={this.style.container}>
          {output}
        </div>
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
