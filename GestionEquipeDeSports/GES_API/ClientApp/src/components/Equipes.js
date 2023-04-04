import React from "react";

export function Equipes(){
  return(
    <React.Fragment>
      <section className="introduction">
        <div className="container">
          <div className="grid">

            <div className="row">
              <div className="col">
                <h1>Vous n'avez encore aucune équipe.</h1> {/*Ici on va vérifier dans la bd si l'utilisateur a une équipe dans la bd */}
                <br></br>
                <p className="fst-italic">Pour utiliser GestionEquipeDeSports, vous devez être membre d'une équipe.</p>
                <br></br>
                <p className="fst-italic">Pour cela vous pouvez :</p>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <h1>Hi</h1>
              </div>

              <div className="col-sm-6">
                <h1>Hello</h1>
              </div>
            </div>
            


          </div>
        </div>
      </section>
    </React.Fragment>
  );
}




































/*import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export class Equipes extends Component {
  constructor(props){
    super(props);
    this.state = {
      equipes: []
    };
  }

  componentDidMount() {
    fetch("api/Equipe")
        .then(res => res.json())
        .then((result) => {
            this.setState({
                equipes: result
            });
        });
  }

  render() {
    return (
      <div>
        <h1>Page des équipes</h1>
        <Link to={'/formulaireEquipe'}>
          <Button variant="success" className="btn btn-success">Ajouter une équipe</Button><p></p>
        </Link>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Region</th>
              <th>Sport</th>
              <th>Association sportive</th>
            </tr>
          </thead>
          <tbody>
            {this.state.equipes.map((eq, index) => (
              <tr key={eq.idEquipe}>
                <td>{index+1}</td>
                <td><Link to={{ pathname: `/uneEquipe/${eq.idEquipe}`}}>{eq.nom}</Link></td>
                <td>{eq.region}</td>
                <td>{eq.sport}</td>
                <td>{eq.associationSportive}</td>
              </tr>
            ))
            }
          </tbody>
        </Table>
      </div>
    );
  }
}*/

