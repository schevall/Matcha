import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logout from './Logout';

class NavBar extends Component {

  render() {
    const { isLogged } = this.props;
    if (!isLogged) {
      return null;
    }
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Matcha</Link>
        </div>
        <div className="navbar-collapse collapse">
          <ul className="navbar-nav">
            <ol className="nav-item"><Link to="/myprofile" className="glyphicon glyphicon-user" /></ol>
            <ol className="nav-item"><Link to="/activy" className="glyphicon glyphicon-flag" /></ol>
          </ul>
          <ul className="navbar-nav">
            <Logout />
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
