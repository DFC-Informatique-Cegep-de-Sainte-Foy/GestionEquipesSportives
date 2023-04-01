import React from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { useAuth0 } from '@auth0/auth0-react';

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    
    return (
      <Component {...props} loginWithRedirect={loginWithRedirect} logout={logout} isAuthenticated={isAuthenticated}/>
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

    function MenuAAfficher()
    {
      if(isAuthenticated === true)
      {
        return (
          <Nav>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/equipes">Équipes</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/evenements">Événements</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/utilisateurs">Utilisateurs</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} className="text-dark" onClick={() => logout()}>Déconnexion</NavLink>
            </NavItem>  
          </Nav>
        );
      } 
      else 
      {
        return (
          <Nav>
            <NavItem>
              <NavLink tag={Link} className="text-dark" onClick={() => loginWithRedirect()}>Connexion</NavLink>
            </NavItem>  
          </Nav>
        );
      }
    }

    return (
      <header className="header-with-gray-strip">
        <div >
          <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
            <NavbarBrand tag={Link} to="/">GestionEquipeDeSports</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <Nav className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Accueil</NavLink>
                </NavItem>

                <MenuAAfficher />
              </Nav>

            </Collapse>
          </Navbar>
        </div>
      </header>

    );
  }
}
export default withMyHook(NavMenu);