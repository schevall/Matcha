import React, { Component } from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};


const style = { width: '400px', margin: '50px' };

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
  defaultValue: [18, 30],
  text: 'Age',
  save:
};

const Distance = {
  min: 0,
  max: 100,
  marks: DistanceMarks,
  id: 'Distance',
  defaultValue: [0, 5],
  text: 'Distance',
};

const Tags = {
  min: 0,
  max: 6,
  marks: TagsMarks,
  id: 'Tags',
  defaultValue: [0, 3],
  text: 'Tags in Common',
};

const Popularity = {
  min: 0,
  max: 20,
  marks: PopularityMarks,
  id: 'Popularity',
  defaultValue: [0, 10],
  text: 'Popularity',
};

const Match = {
  min: 0,
  max: 20,
  marks: MatchingMarks,
  id: 'Matching',
  defaultValue: [0, 10],
  text: 'Matching Score',
};

class AdvancedFilterSelector extends Component {

  saveChange = (el) => {
    console.log('Rwly', el);
  }

  AgeChange = (el) => {

  }

  DistanceChange = (el) => {

  }

  test = (e) => {
    console.log('test', e);
  }

  render() {
    const type = [Age, Distance, Tags, Popularity, Match];
    const FilterSelector = type.map(el => (
      <div key={el.id} style={style}>
        <span>{el.text}</span>
        <Slider.Range
          min={el.min}
          max={el.max}
          marks={el.marks}
          onChange={el.save}
          defaultValue={el.defaultValue}
          handle={handle}
        />
      </div>));
    return <div>{FilterSelector}</div>;
  }
}

export default AdvancedFilterSelector;
