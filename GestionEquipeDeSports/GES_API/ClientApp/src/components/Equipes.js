import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom';

export class Equipes extends Component {
  static displayName = Equipes.name;

  render() {
    return (
      <div>
        <h1>Page des équipes</h1>

        <p>Ici seront les informations sur les équipes.</p>
        <Link to={'/formulaireEquipe'}>
          <Button variant="success" >Ajouter une equipe</Button>
        </Link>
      </div>
    );
  }
}
