import React, { Component } from 'react';
import TextField from 'material-ui/TextField';


export default class MyBio extends Component {

  constructor(props) {
    super(props);
    const { bio } = props;
    console.log('bio', bio);
    const length = bio.length;
    this.state = {
      bio,
      cansubmit: false,
      length,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { bio } = nextProps;
    console.log('next.', bio);
    const length = bio.length;
    this.setState({ bio, length, cansubmit: false });
  }

  handleChange = (e) => {
    e.preventDefault();
    const bio = e.target.value;
    const length = bio.length;
    if (length <= 320) {
      this.setState({ bio, length, cansubmit: true });
    } else {
      this.setState({ bio, length, cansubmit: false });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { bio, length } = this.state;
    if (bio.length <= 320) {
      this.setState({ bio, length, cansubmit: false });
      this.props.handleBioModif(bio);
    }
  }


  render() {
    const { bio, length, cansubmit } = this.state;
    console.log();
    let message = '';
    if (length >= 320) {
      message = 'You have reach the maximum';
    } else {
      const count = 320 - length;
      message = `Characters left: ${count}`;
    }
    return (
      <div className="bio_container">
        <h3>Bio: </h3>
        <span>{message}</span>
        <TextField
          name="mybio"
          hintText={bio ? null : 'Write something about you !'}
          onChange={this.handleChange}
          underlineShow={false}
          fullWidth
          multiLine
          value={bio}
          rows={2}
        />
        <br />
        {!cansubmit ? null : <button type="submit" onClick={this.handleSubmit}>Save Change</button>}
      </div>
    );
  }
}
