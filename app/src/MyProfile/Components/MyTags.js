import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { WithContext as ReactTags } from 'react-tag-input';
import { Grid, Row, Col } from 'react-bootstrap'
import '../CSS/reactTags.css';

class MyTags extends React.Component {

  state ={
    error: '',
  }

  handleDelete = (i) => {
    this.setState({ error: '' });
    const { tags } = this.props;
    tags.splice(i, 1);
    Object.keys(tags).forEach(key => (tags[key].id = key));
    this.props.handleUpdate(tags);
  }

  handleAddition = (tag) => {
    const { tags } = this.props;
    const currentTags = tags.map(el => (el.text));
    if (tag.length > 14) {
      this.setState({ error: 'Tag is too long (14 max)' });
    } else if (tags.length >= 6) {
      this.setState({ error: 'Too much tags (6 max)' });
    } else if (currentTags.includes(tag)) {
      this.setState({ error: 'You have this tag already' });
    } else {
      tags.push({
        id: tags.length + 1,
        text: tag,
      });
      this.props.handleUpdate(tags);
    }
  }

  handleInputChange = () => {
    this.setState({ error: '' });
  }

  render() {
    const { tags, suggestions, status } = this.props;
    const { error } = this.state;
    const ready = status === 'has changed' || status === 'saved';
    const bsStyle = status === 'saved' ? 'success' : 'default';
    return (
      <div>
        <ReactTags
          className="ReactTags__tags ReactTags__tagInput ReactTags__suggestions"
          tags={tags}
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleInputChange={this.handleInputChange}
        />
        <span style={{ color: 'red' }} >{error}</span>
        { !ready ? null :
        <Button
          active={ready}
          onClick={this.props.handleSave}
          bsStyle={bsStyle}
          style={{ marginTop: '5px' }}
        >
          {status === 'saved' ? 'Saved' : 'Save'}
        </Button>}
      </div>
    );
  }
}

export default MyTags;
