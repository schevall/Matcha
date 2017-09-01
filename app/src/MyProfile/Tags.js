import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import secureAxios from '../secureAxios.js';
import MyTags from './Components/MyTags.js';

class Tags extends Component {

  constructor(props) {
    super(props);
    const { tags } = props;
    this.state = {
      tags,
      tagList: [],
      status: 'no change',
    };
  }

  componentWillMount() {
    secureAxios('/tags/getTagsList', 'GET')
      .then(({ data }) => {
        if (data.error) console.log(data.error);
        else {
          const { tagList } = data;
          this.setState({ tagList });
        }
      });
  }

  updateTags = (tags) => {
    this.setState({ tags, status: 'has changed' });
  }

  saveTags = () => {
    const { tags } = this.state;
    const payload = { tags };
    secureAxios('/users/update/tags', 'POST', payload)
      .then(({ data }) => {
        if (data.error) console.log(data.error);
        else {
          this.setState({ status: 'saved' });
        }
      });
  }

  render() {
    const { tags, tagList, status } = this.state;
    return (
      <div >
        <Row>Your tags :</Row>
        <MyTags
          tags={tags}
          suggestions={tagList}
          handleUpdate={this.updateTags}
          handleSave={this.saveTags}
          status={status}
        />
      </div>
    );
  }
}

export default Tags;
