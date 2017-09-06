import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import secureAxios from '../secureAxios.js';
import MyTags from './Components/MyTags.js';
import { logoutAuthError } from '../Actions/Login/loginBound.js';

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
        if (data.error) {
          if (data.error === 'authControl') {
            this.props.dispatch(logoutAuthError('No token provided, to connect, please sign in'));
          } else {
            console.log(data.error);
          }
        } else {
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
        if (data.error) {
          if (data.error === 'authControl') {
            this.props.dispatch(logoutAuthError('No token provided, to connect, please sign in'));
          } else {
            console.log(data.error);
          }
        } else {
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

export default connect()(Tags);
