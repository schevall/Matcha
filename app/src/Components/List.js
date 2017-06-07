import React from 'react';
import axios from 'axios';

class List extends React.Component {

  state = {
    users: [],
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const url = '/api/users';
    axios.get(url)
    .then(({ data }) => {
      const array = [];
      data.all.forEach((item) => {
        array.push({ login: item.login });
      });
      this.setState({ users: array });
    });
  }

  render() {
    const list = [];
    this.state.users.forEach((item) => {
      list.push(item.login);
    });
    const listItem = list.map(item =>
      <li key={item.toString()}>{item}</li>,
    );
    return (
      <form onSubmit={this.handleSubmit}>
          User list<br />
        <a href="/" >return to lobby</a> <br />
        <input type="submit" value="Show" className="btn btn-primary" /> <br />
        <ul>{ listItem }</ul>
      </form>
    );
  }
}

// class List extends React.Component {
//
//   state = {
//     users: [],
//   }
//
//   handleSubmit = (event) => {
//     event.preventDefault();
//     const url = '/api/users';
//     axios.get(url)
//     .then(({ data }) => {
//       const array = ListTools.makeArray(data.all, 'login');
//       this.setState({ users: array });
//     });
//   }
//
//   render() {
//     console.log(ListTools)
//     const listItem = ListTools.showList(this.state.users, 'login');
//     return (
//       <form onSubmit={this.handleSubmit}>
//           User list<br />
//         <a href="/" >return to lobby</a> <br />
//         <input type="submit" value="Show" className="btn btn-primary" /> <br />
//         <ul>{ listItem }</ul>
//       </form>
//     );
//   }
// }

export default List;
