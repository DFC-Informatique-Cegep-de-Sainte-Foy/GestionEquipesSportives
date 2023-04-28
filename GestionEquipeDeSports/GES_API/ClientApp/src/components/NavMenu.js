import React from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { useAuth0 } from '@auth0/auth0-react';
import './Profile.js'
import Profile from './Profile.js';
import "bootstrap/dist/css/bootstrap.min.css"
import AfficherPageEnFonctionDuRole from './AfficherPageEnFonctionDuRole';

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
    const loginWithRedirect = this.props.loginWithRedirect;
    const logout = this.props.logout;
    const isAuthenticated = this.props.isAuthenticated;

    function MenuAAfficher() {
      if (isAuthenticated === true) {
        return (
          <Nav>
            <NavItem>
              <NavLink tag={Link} className="text-white" to="/accueilEntraineur">Page d'accueil Entraineur</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} className="text-white" to="/ma-page-accueil">Ma page d'Accueil</NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink tag={Link} className="text-white" to="/evenements">Événements</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} className="text-white" to="/equipes">Équipes</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} className="text-white" to="/utilisateurs">Utilisateurs</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} className="text-white" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Déconnexion</NavLink>
            </NavItem>

            <Profile />

          </Nav>
        );
      }
      else {
        return (
          <Nav>
            <NavItem>
              <NavLink tag={Link} className="text-white" to="/">Accueil</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} className="text-white" onClick={() => loginWithRedirect()}>Connexion</NavLink>
            </NavItem>

            <NavItem className="border border-success rounded">
              <NavLink tag={Link} className="text-white" onClick={() => loginWithRedirect({
                /*appState: {
                  returnTo: "/profile",
                },*/
                authorizationParams: {
                  screen_hint: "signup",
                },
              })}>
                <span className='text-success'>Inscription</span>
              </NavLink>
            </NavItem>
          </Nav>
        );
      }
    }

    return (
      <header className="header-with-gray-strip">
        <div>
          <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white navbar-dark bg-dark border-bottom box-shadow mb-3">
            <NavbarBrand tag={Link} to="/">
              <span className='text-success'>Gestion</span><span className='text-primary'>Equipe</span><span className='text-warning'>Sportive</span></NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>

              <Nav className="navbar-nav flex-grow">
               {/*  <MenuAAfficher /> <AfficherPageEnFonctionDuRole /> <Profile />*/}

               <AfficherPageEnFonctionDuRole/>
                
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </header>

    );
  }
}
export default withMyHook(NavMenu);