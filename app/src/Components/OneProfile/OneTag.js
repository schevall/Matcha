import React from 'react';
import Chip from 'material-ui/Chip';

export default class Onetag extends React.Component {

  constructor(props) {
    super(props);
    const { tags } = props;
    this.state = { tags };
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
  }

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
    const { tags } = this.state;
    return (
      <div className="my_tag_container">
        {!tags.length ? null :
        <div style={this.styles.wrapper}>
          {this.state.tags.map(this.renderChip, this)}
        </div>}
      </div>
    );
  }
}
