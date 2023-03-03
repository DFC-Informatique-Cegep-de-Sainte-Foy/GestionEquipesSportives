import React from "react";
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom';

export function Evenements(){
    
    return(
        <div>
            <h1>Bienvenue dans la page des évenements</h1>
            <Link to={'/formulaireEvenement'}>
                <Button class="btn btn-success" >Ajouter un evenement</Button>
            </Link>
        </div>
    );
}