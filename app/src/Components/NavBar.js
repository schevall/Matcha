import React, { Component } from 'react';
import { Navbar, NavItem, MenuItem, Nav,
         NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Logout from './Logout';

class NavBar extends Component {

  render() {
    const { isLogged } = this.props;
    if (!isLogged) {
      return null;
    }
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Lobby</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/profile">
            <NavItem>Profile</NavItem>
          </LinkContainer>
          <LinkContainer to="/suggestions">
            <NavItem>Suggestions</NavItem>
          </LinkContainer>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
          </NavDropdown>
          <LinkContainer to="/signin">
            <NavItem><Logout /></NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;
