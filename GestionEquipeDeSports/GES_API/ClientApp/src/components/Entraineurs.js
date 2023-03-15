import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class Entraineurs extends Component{
    render(){
        return(
            <div>
                <h1>Liste des entraîneurs</h1>
                <p>La liste des entraîneurs sera affichée ici</p>
                <Link to={'/formulaireEntraineur'}>
                    <Button variant="success" >Ajouter un entraîneur</Button>
                </Link>
            </div>
        );
    }
}