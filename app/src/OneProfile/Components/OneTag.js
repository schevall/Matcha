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

  formatTags = (tags) => {
    const output = [];
    let i = 0;
    tags.forEach((tag) => {
      output.push({ text: tag, id: i, key: i });
      i += 1;
    });
    return output;
  }

  renderChip(data) {
    return (
      <Chip
        key={data.key}
        style={this.styles.chip}
      >
        {data.text}
      </Chip>
    );
  }

  render() {
    const { tags } = this.props;
    const tagsKeys = this.formatTags(tags);
    return (
      <div className="my_tag_container">
        {!tags.length ? null :
        <div style={this.styles.wrapper}>
          {tagsKeys.map(this.renderChip, this)}
        </div>}
      </div>
    );
  }
}
