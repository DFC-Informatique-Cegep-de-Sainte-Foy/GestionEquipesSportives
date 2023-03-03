import React from "react";
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom';

export function Evenements(){
    
    return(
        <div>
            <h1>Bienvenue dans la page des évenements</h1>
            <Button class="btn btn-success" ><Link to={'./formulaireEvenement'}/>Ajouter un evenement</Button>
        </div>
    );
}