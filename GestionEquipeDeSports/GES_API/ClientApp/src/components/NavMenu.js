import React from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler,  Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { useAuth0 } from '@auth0/auth0-react';
import './Profile.js'
import Profile from './Profile.js';
import "bootstrap/dist/css/bootstrap.min.css"
import AfficherPageEnFonctionDuRole from './AfficherPageEnFonctionDuRole';
import { NavLink } from 'react-bootstrap';
import logo from '../images/logo.png';

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
      <Component {...props} loginWithRedirect={loginWithRedirect} logout={logout} isAuthenticated={isAuthenticated} />
    );
  }
}

class NavMenu extends React.Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header className="header-with-gray-strip">
        <div>
          <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white navbar-dark bg-dark border-bottom box-shadow mb-3">
            <NavItem className='d-flex  align-items-center'>
              <NavLink tag={Link} to="/">
                <img src={logo} className="App-logo" alt="logo"  />
              </NavLink>
            </NavItem>
            <NavbarBrand tag={Link} to="/">
              <span className='text-success'>Gestion</span><span className='text-primary'>Equipe</span><span className='text-warning'>Sportive</span></NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>

              <Nav className="navbar-nav flex-grow">
                <AfficherPageEnFonctionDuRole />
                <Profile />
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </header>

    );
  }
}
export default withMyHook(NavMenu);