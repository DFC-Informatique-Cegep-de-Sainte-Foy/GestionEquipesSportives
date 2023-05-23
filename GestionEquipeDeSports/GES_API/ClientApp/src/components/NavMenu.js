import React, { useEffect, useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { useAuth0 } from '@auth0/auth0-react';
import './Profile.js'
import Profile from './Profile.js';
import "bootstrap/dist/css/bootstrap.min.css"
import AfficherPageEnFonctionDuRole from './AfficherPageEnFonctionDuRole';
import logo from '../images/logo.png';

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const { user, getAccessTokenSilently, loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const [userEstDansLaBD, setUserEstDansLaBD] = useState(false);

    async function getUtilisateur() {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();

        await fetch(`api/utilisateur/${user.name}`, {
          headers: {
            Accept: "application/json", Authorization: `Bearer ${token}`
          },
        }).then(response => {
          if (response.status === 404) {
            setUserEstDansLaBD(false);
          } else if (response.ok) {
            return response.json();
          }
        }).then(data => {
          if (data) {
            setUserEstDansLaBD(true);
          }
        }).catch(err => {
          console.error(err);
          setUserEstDansLaBD(false);
        });
      } else {
        setUserEstDansLaBD(false);
      }
    }

    useEffect(() => {
      getUtilisateur();
    }, [isAuthenticated, userEstDansLaBD]);

    return (
      <Component {...props} loginWithRedirect={loginWithRedirect} logout={logout} isAuthenticated={isAuthenticated} userEstDansLaBD={userEstDansLaBD} />
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
    const { isAuthenticated, userEstDansLaBD, logout, loginWithRedirect } = this.props;
    if (isAuthenticated && !userEstDansLaBD) {
      return (
        <>
          <header className="header-with-gray-strip">
            <div>
              <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white navbar-dark bg-dark border-bottom box-shadow mb-3">
                <NavItem className='d-flex  align-items-center'>
                  <NavLink tag={Link} to="/">
                    <img src={logo} className="App-logo" alt="logo" />
                  </NavLink>
                </NavItem>
                <NavbarBrand tag={Link} to="/">
                  <span className='text-success'>Gestion</span><span className='text-primary'>Equipe</span><span className='text-warning'>Sportive</span></NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                  <Nav className="navbar-nav flex-grow">
                    <NavItem>
                      <NavLink tag={Link} className="text-white" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Déconnexion</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </header>
        </>
      );
    }
    else if (isAuthenticated && userEstDansLaBD) {
      return (
        <>
          <header className="header-with-gray-strip">
            <div>
              <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white navbar-dark bg-dark border-bottom box-shadow mb-3">
                <NavItem className='d-flex  align-items-center'>
                  <NavLink tag={Link} to="/">
                    <img src={logo} className="App-logo" alt="logo" />
                  </NavLink>
                </NavItem>
                <NavbarBrand tag={Link} to="/">
                  <span className='text-success'>Gestion</span><span className='text-primary'>Equipe</span><span className='text-warning'>Sportive</span></NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                  <Nav className="navbar-nav flex-grow">
                    <AfficherPageEnFonctionDuRole estDansLaBD={userEstDansLaBD} />
                    <Profile />
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </header>
        </>
      );
    }
    else {
      return (
        <>
          <header className="header-with-gray-strip">
            <div>
              <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white navbar-dark bg-dark border-bottom box-shadow mb-3">
                <NavItem className='d-flex  align-items-center'>
                  <NavLink tag={Link} to="/">
                    <img src={logo} className="App-logo" alt="logo" />
                  </NavLink>
                </NavItem>
                <NavbarBrand tag={Link} to="/">
                  <span className='text-success'>Gestion</span><span className='text-primary'>Equipe</span><span className='text-warning'>Sportive</span></NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                  <Nav className="navbar-nav flex-grow">
                    <NavItem className="border border-success rounded">
                      <NavLink tag={Link} className="text-white" onClick={() => loginWithRedirect({
                        authorizationParams: {
                          screen_hint: "signup",
                        },
                      })}>
                        <span className='text-success'>Inscription</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-white" onClick={() => loginWithRedirect()}>Connexion</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </header>
        </>
      );
    }
  }
}
export default withMyHook(NavMenu);