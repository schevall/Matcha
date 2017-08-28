import React from 'react';
import Chip from 'material-ui/Chip';

export default class Onetag extends React.Component {

  styles = {
    chip: {
      margin: 4,
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  };

  renderChip(data) {
    return (
      <Chip
        key={data.key}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    );
  }

  render() {
    console.log('TAGS', this.props);
    const { tags } = this.props;
    return (
      <div className="my_tag_container">
        {!tags.length ? null :
        <div style={this.styles.wrapper}>
          {tags.map(this.renderChip, this)}
        </div>}
      </div>
    );
  }
}
