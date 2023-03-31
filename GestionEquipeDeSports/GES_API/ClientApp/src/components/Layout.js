import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import './css/Layout.css';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="centered-container container-max-width-2-3">
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
