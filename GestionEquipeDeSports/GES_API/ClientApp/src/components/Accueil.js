import React, { Component } from 'react';

export class Accueil extends Component {
  static displayName = Accueil.name;

  render() {
    return (
      <div>
        <h1>Bienvenue à la page d'accueil!</h1>

        <p>L’application GestionEquipeDeSports vous permet d’entrer toutes les informations pertinentes de votre saison et d’automatiser vos processus.</p>
      </div>
    );
  }
}
