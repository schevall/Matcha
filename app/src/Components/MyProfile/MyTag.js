import React from 'react';
import Chip from 'material-ui/Chip';
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';

class Mytag extends React.Component {

  constructor(props) {
    super(props);
    const { tags } = props;
    this.state = { tags, changed: false, newtag: '' };
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

  handleRequestDelete = (key) => {
    const { tags } = this.state;
    if (tags) {
      const chipToDelete = tags.map(chip => chip.key).indexOf(key);
      tags.splice(chipToDelete, 1);
      this.setState({ tags, changed: true });
    }
  };

  handleAddNewTag = (e) => {
    e.preventDefault();
    const { tags, newtag, changed } = this.state;
    const index = tags.length + 1;
    const double = tags.filter(obj => (
      obj.label === newtag
    ));
    if (index >= 7) {
      const title = 'You already have the maximum of tags';
      this.props.dispatch(Notifications.error({ title }));
    } else if (double.length) {
      const title = 'You already have this tag!';
      this.setState({ newtag: '' });
      this.props.dispatch(Notifications.error({ title }));
    } else if (newtag) {
      if (newtag.length >= 16) {
        const title = 'A tag cannot be more than 16 characters long';
        this.props.dispatch(Notifications.error({ title }));
        this.setState({ tags, newtag: '', changed });
      } else {
        const toadd = { key: index, label: newtag };
        tags.push(toadd);
        this.setState({ tags, newtag: '', changed: true });
      }
    }
  }

  handleChange = (e) => {
    this.setState({ newtag: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tags } = this.state;
    this.props.handleOnSubmit(tags);
    this.setState({ tags, changed: false, newtag: '' });
  }

  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    );
  }

  render() {
    const { changed, tags } = this.state;
    return (
      <div className="my_tag_container">
        {!tags.length ? null :
        <div style={this.styles.wrapper}>
          {this.state.tags.map(this.renderChip, this)}
        </div>}
        <br />
        <p>Enter new tags (6 max)</p>
        <input type="text" onChange={this.handleChange} value={this.state.newtag} />
        <button type="submit" onClick={this.handleAddNewTag}>Add</button>
        <br />
        {!changed ? null : <button type="submit" onClick={this.handleSubmit}>Save Change</button>}
      </div>
    );
  }
}

const mapStateToProps = ({
  notifications,
}) => ({
  notifications,
});
export default connect(mapStateToProps)(Mytag);
