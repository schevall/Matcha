import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import Slider from 'rc-slider';
import Drawer from 'material-ui/Drawer';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import TagSelector from './TagSelector.js';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


const style = { padding: '20px' };

const AgeMarks = {
  18: 18,
  25: 25,
  30: 30,
  40: 40,
  50: 50,
  60: 60,
  75: 75,
  100: '> 100 ans',
};

const DistanceMarks = {
  0: 0,
  5: 5,
  10: 10,
  20: 20,
  50: 50,
  100: '> 100 kms',
};

const TagsMarks = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
};

const PopularityMarks = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  5: 5,
  10: 10,
  20: '> 20',
};

const MatchingMarks = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  5: 5,
  10: 10,
  20: '> 20',
};

const Age = {
  min: 18,
  max: 100,
  marks: AgeMarks,
  id: 'Age',
  defaultValue: [18, 100],
  text: 'Age',
};

const Distance = {
  min: 0,
  max: 100,
  marks: DistanceMarks,
  id: 'Distance',
  defaultValue: [0, 100],
  text: 'Distance',
};

const Tags = {
  min: 0,
  max: 6,
  marks: TagsMarks,
  id: 'Tags',
  defaultValue: [0, 6],
  text: 'Tags in Common',
};

const Popularity = {
  min: 0,
  max: 20,
  marks: PopularityMarks,
  id: 'Popularity',
  defaultValue: [0, 20],
  text: 'Popularity',
};

const Matching = {
  min: 0,
  max: 20,
  marks: MatchingMarks,
  id: 'Matching',
  defaultValue: [0, 20],
  text: 'Matching Score',
};


class AdvancedFilterSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      searchTag: [],
      Age: { min: Age.defaultValue[0], max: Age.defaultValue[1] },
      Distance: { min: Distance.defaultValue[0], max: Distance.defaultValue[1] },
      Tags: { min: Tags.defaultValue[0], max: Tags.defaultValue[1] },
      Popularity: { min: Popularity.defaultValue[0], max: Popularity.defaultValue[1] },
      Matching: { min: Matching.defaultValue[0], max: Matching.defaultValue[1] },
      filter: props.filter,
    };
  }

  ChangeState(field, min, max) {
    this.setState({ [field]: { min, max } });
  }

  AgeChange = (e) => {
    this.ChangeState('Age', e[0], e[1]);
  }

  DistanceChange = (e) => {
    this.ChangeState('Distance', e[0], e[1]);
  }

  TagsChange = (e) => {
    this.ChangeState('Tags', e[0], e[1]);
  }

  PopularityChange = (e) => {
    this.ChangeState('Popularity', e[0], e[1]);
  }

  MatchingChange = (e) => {
    this.ChangeState('Matching', e[0], e[1]);
  }

  functionArray = (id) => {
    if (id === 'Age') return this.AgeChange;
    else if (id === 'Distance') return this.DistanceChange;
    else if (id === 'Tags') return this.TagsChange;
    else if (id === 'Popularity') return this.PopularityChange;
    else if (id === 'Matching') return this.MatchingChange;
    return this.MatchingChange;
  }

  Filter = (el) => {
    const stateSaver = this.functionArray(el.id);
    return (
      <div key={el.id} style={style}>
        <span>{el.text}</span>
        <Range
          min={el.min}
          max={el.max}
          marks={el.marks}
          onChange={stateSaver}
          defaultValue={el.defaultValue}
        />
      </div>);
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleSave = (e) => {
    e.preventDefault();
    this.handleToggle();
    this.props.search(this.state);
  }

  updateTags = (searchTag) => {
    this.setState({ searchTag });
  }

  render() {
    const type = [Age, Distance, Tags, Popularity, Matching];
    const FilterSelector = type.map(el => (this.Filter(el)));
    const { searchTag } = this.state;
    return (
      <Grid>
        <Row >
          <Col xs={12} md={2}>Search by:</Col>
          <div>
            <Button
              onClick={this.handleToggle}
              style={{ margin: '3px' }}
              bsStyle="default"
            >
              Search
            </Button>
          </div>
          <div>
            <Button
              onClick={this.props.cancel}
              style={{ margin: '3px' }}
              bsStyle="default"
            >
              Cancel Search
            </Button>
          </div>
        </Row>
        <Row>
          <Drawer
            width="90%"
            docked={false}
            openSecondary
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
            <div style={{ margin: 'auto' }} className="container">
              <p style={style} >Advanced Search</p>
              {FilterSelector}
              <div style={{ margin: '15px 20px' }}>
                <TagSelector handleUpdate={this.updateTags} tags={searchTag} />
              </div>
              <div style={{ marginTop: '20px' }}>
                <Button
                  onClick={this.handleSave}
                  style={{ margin: '3px' }}
                  bsStyle="default"
                >
                  Save
                </Button>
                <Button
                  onClick={this.handleToggle}
                  style={{ margin: '3px' }}
                  bsStyle="default"
                >
                  Close
                </Button>
              </div>
            </div>
          </Drawer>
        </Row>
      </Grid>
    );
  }
}

export default AdvancedFilterSelector;
