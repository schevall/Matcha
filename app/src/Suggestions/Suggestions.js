import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import { Grid, Row, Col } from 'react-bootstrap';
import secureAxios from '../secureAxios.js';
import OneBasicProfilCard from '../OneProfile/Components/OneBasicProfilCard.js';
import AdvancedFilterSelector from './AdvancedFilter.js';
import SortingSelector from './SortingSelector.js';
import { GetMatchingScore } from '../ToolBox/MatchingTool.js';
import { calculateAge } from '../ToolBox/DateTools.js';
import { getDistance, CountCommonTags, CalculatePopularity } from '../ToolBox/InteractionsTools.js';

class Suggestions extends Component {

  constructor(props) {
    super(props);
    const { username } = props;
    this.state = {
      username,
      visitor: null,
      mounted: null,
      sorting: null,
      rev: 1,
      advancedFilter: null,
      suggestions: null,
      toShow: null,
    };
    this.style = {
      card: {
        margin: '5px',
      },
      col: {
        marginRight: '10px',
        marginTop: '10px',
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
    this.setState({ mounted: true, suggestions: sorted, toShow: suggestions, visitor });
  }

  sortBy = (sorting, rev) => {
    const { toShow } = this.state;
    const v = this.state.visitor;
    const sorted = toShow.sort((a, b) => {
      if (sorting === 'Age') {
        const diff = rev * (calculateAge(a.birthDate) - calculateAge(b.birthDate));
        return diff >= 1 ? 1 : -1;
      }
      else if (sorting === 'Distance') {
        const diff = rev * (getDistance(a.geo, v.geo) - getDistance(b.geo, v.geo));
        return diff >= 1 ? 1 : -1;
      }
      else if (sorting === 'Tags') {
        const diff = rev * (CountCommonTags(a.tags, v.tags) - CountCommonTags(b.tags, v.tags));
        return diff >= 1 ? -1 : 1;
      }
      else if (sorting === 'Popularity') {
        const diff = rev * (CalculatePopularity(a) - CalculatePopularity(b));
        return diff >= 1 ? -1 : 1;
      }
      else if (sorting === 'Matching') {
        const diff = rev * (GetMatchingScore(a, v) - GetMatchingScore(b, v));
        return diff >= 1 ? -1 : 1;
      }
      return 0;
    });
    this.setState({ toShow: sorted, sorting, rev });
  }

  filter = (e) => {
    e.preventDefault();
    const newsorting = e.target.id;
    const { sorting, rev } = this.state;
    const type = ['Age', 'Distance', 'Tags', 'Popularity', 'Matching'];
    if (type.includes(newsorting)) {
      if (newsorting === sorting && rev === -1) this.sortBy(newsorting, 1);
      else if (newsorting === sorting && rev === 1) this.sortBy(newsorting, -1);
      else this.sortBy(newsorting, 1);
    }
  }

  isInRange = (target, filter) => {
    const { visitor } = this.state;
    const age = calculateAge(target.birthDate);
    const distance = getDistance(target.geo, visitor.geo);
    const tags = CountCommonTags(target.tags, visitor.tags);
    const popularity = CalculatePopularity(target);
    const matching = GetMatchingScore(target, visitor);
    if ((age >= filter.Age.min && age <= filter.Age.max) || filter.Age.max === 100) {
      if (distance >= filter.Distance.min * 1000 && (distance <= filter.Distance.max * 1000 || filter.Distance.max === 100)) {
        if (tags >= filter.Tags.min && tags <= filter.Tags.max) {
          if (popularity >= filter.Popularity.min && (popularity <= filter.Popularity.max || filter.Popularity.max === 20)) {
            if (matching >= filter.Matching.min && (matching <= filter.Matching.max || filter.Matching === 20)) {
              return target;
            }
          }
        }
      }
    }
    return null;
  }

  advancedFilter = (filter) => {
    const { Age, Distance, Matching, Popularity, Tags } = filter;
    const advancedFilter = { Age, Distance, Matching, Popularity, Tags };
    const { suggestions } = this.state;
    const array = suggestions.map(user => (
      this.isInRange(user, advancedFilter)
    ));
    const output = array.filter(n => (n !== undefined && n !== null));
    this.setState({ toShow: output });
  }

  cancelFilter = () => {
    const { suggestions } = this.state;
    this.setState({ toShow: suggestions });
  }

  render() {
    if (!this.state.mounted) return (<CircularProgress />);
    const { toShow, visitor } = this.state;
    const output = toShow.map(user => (
      <Col key={user.username} className="border" style={this.style.col}>
        <OneBasicProfilCard
          isProfilePage={false}
          key={user.username}
          style={this.style.card}
          visitor={visitor}
          target={user}
          button
        />
      </Col>
  ));
    return (
      <Grid fluid>
        <AdvancedFilterSelector filter={this.advancedFilter} cancel={this.cancelFilter} />
        <SortingSelector filter={this.filter} />
        <Row className="justify-content-center">{output}</Row>
      </Grid>
    );
  }
}

const mapStateToProps = ({
  loginReducer: { username },
}) => ({
  username,
});

export default connect(mapStateToProps)(Suggestions);
