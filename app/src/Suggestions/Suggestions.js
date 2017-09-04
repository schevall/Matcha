import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import { Grid, Row, Col } from 'react-bootstrap';
import secureAxios from '../secureAxios.js';
import OneBasicProfilCard from '../OneProfile/Components/OneBasicProfilCard.js';
import Filter from './Filter.js';
import Sorting from './Sorting.js';
import Search from './Search.js';
import { GetMatchingScore, TagMatch } from '../ToolBox/MatchingTool.js';
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
      search: null,
      toShow: null,
      status: 'suggestions',
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
          const sorted = this.sortWithMatchingScore(suggestions, visitor);
          this.setState({ mounted: true, suggestions: sorted, toShow: sorted, visitor });
        }
      });
  }

  sortWithMatchingScore = (list = [], visitor) => {
    const sorted = list.sort((a, b) => {
      const aPoints = GetMatchingScore(a, visitor);
      const bPoints = GetMatchingScore(b, visitor);
      if (aPoints < bPoints) return 1;
      if (aPoints > bPoints) return -1;
      return 0;
    });
    return sorted;
  }

  sortBy = (sorting, rev) => {
    const { toShow } = this.state;
    const v = this.state.visitor;
    const sorted = toShow.sort((a, b) => {
      if (sorting === 'Age') {
        const diff = rev * (calculateAge(a.birthDate) - calculateAge(b.birthDate));
        return diff >= 1 ? 1 : -1;
      } else if (sorting === 'Distance') {
        const diff = rev * (getDistance(a.geo, v.geo) - getDistance(b.geo, v.geo));
        return diff >= 1 ? 1 : -1;
      } else if (sorting === 'Tags') {
        const diff = rev * (CountCommonTags(a.tags, v.tags) - CountCommonTags(b.tags, v.tags));
        return diff >= 1 ? -1 : 1;
      } else if (sorting === 'Popularity') {
        const diff = rev * (CalculatePopularity(a) - CalculatePopularity(b));
        return diff >= 1 ? -1 : 1;
      } else if (sorting === 'Matching') {
        const diff = rev * (GetMatchingScore(a, v) - GetMatchingScore(b, v));
        return diff >= 1 ? -1 : 1;
      }
      return 0;
    });
    this.setState({ toShow: sorted, sorting, rev });
  }

  sort = (e) => {
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
    const { Age, Distance, Tags, Popularity, Matching, searchTag } = filter;
    const age = calculateAge(target.birthDate);
    const distance = getDistance(target.geo, visitor.geo);
    const communTag = CountCommonTags(target.tags, visitor.tags);
    const popularity = CalculatePopularity(target);
    const matching = GetMatchingScore(target, visitor);
    if ((age >= Age.min && age <= Age.max) || Age.max === 100) {
      if (distance >= Distance.min * 1000 && (distance <= Distance.max * 1000 || Distance.max === 100)) {
        if (communTag >= Tags.min && communTag <= Tags.max) {
          if (popularity >= Popularity.min && (popularity <= Popularity.max || Popularity.max === 20)) {
            if (matching >= Matching.min && (matching <= Matching.max || Matching === 20)) {
              if (!searchTag || TagMatch(searchTag, target.tags)) {
                return target;
              }
            }
          }
        }
      }
    }
    return null;
  }

  filter = (filter) => {
    const { suggestions } = this.state;
    const array = suggestions.map(user => (
      this.isInRange(user, filter)
    ));
    const output = array.filter(n => (n !== undefined && n !== null));
    this.setState({ toShow: output });
  }

  cancelParams = () => {
    const { suggestions } = this.state;
    this.setState({ toShow: suggestions, status: 'suggestions' });
  }

  search = (searchParams) => {
    secureAxios('/users/search', 'POST', { searchParams })
      .then(({ data }) => {
        if (data.error) console.log(data.error);
        else {
          const { search } = data;
          const sorted = this.sortWithMatchingScore(search, this.state.visitor);
          this.setState({ toShow: sorted, search: sorted, status: 'search' });
        }
      });
  }

  render() {
    if (!this.state.mounted) return (<CircularProgress />);
    const { toShow, visitor, status } = this.state;
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
      <Grid style={{ width: '80vw' }}>
        <Row >
          <Col xs={12} sm={12} md={12} lg={9} lgOffset={2}>
            <Filter filter={this.filter} cancel={this.cancelParams} />
            <Search search={this.search} cancel={this.cancelParams} />
            <Sorting sort={this.sort} />
            <Row className="justify-content-center">
              { status === 'suggestions' ?
                <h2>Suggestions Result</h2>
                : <h2>Search Result</h2>
              }
            </Row>
            <Row className="justify-content-center">{output}</Row>
          </Col>
        </Row>
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
