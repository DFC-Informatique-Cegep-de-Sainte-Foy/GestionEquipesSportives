import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
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
        <div >
          <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
            <NavbarBrand tag={Link} to="/">GestionEquipeDeSports</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>

              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Accueil</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/equipes">Équipes</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/evenements">Événements</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/utilisateurs">Utilisateurs</NavLink>
                </NavItem>

                <NavItem className="d-none d-md-inline">
                  <hr className="my-0 mx-2" style={{ height: "40px", borderLeft: "0px solid #ccc" }} />
                </NavItem>

                <NavItem className="border border-dark rounded">
                  <NavLink tag={Link} className="text-dark" to="/connexion">Connexion</NavLink>
                </NavItem>
              </ul>

            </Collapse>
          </Navbar>
        </div>
      </header>

    );
  }
}
