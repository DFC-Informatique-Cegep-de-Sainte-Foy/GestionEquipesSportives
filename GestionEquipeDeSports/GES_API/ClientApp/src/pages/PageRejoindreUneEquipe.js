import React from "react";
import { Container, Row } from 'react-bootstrap';

function PageRejoindreUneEquipe(){
    return(
        <Container style={{ justifyContent: 'center'}}>
            <Row>
                <h2 >Comment rejoindre une équipe sur 
                    <span className='text-success'> Gestion</span><span className='text-primary'>Equipe</span><span className='text-warning'>Sportive</span>
                </h2>
            </Row>
            <p></p>
            <p></p>
            <Row >
                <h3>1. Le responsable d'équipe vous a invité par email.</h3><p></p>
                <p>Regardez dans vos emails si vous avez reçu une invitation.<br></br>Dans l'email, copiez l'id de l'équipe et collez le dans le champ ci-dessous, puis cliquez sur Rejoindre.</p>

                <div className="col-xl-8">
                    <input type="guid" className="form-control" name="identifiant" placeholder="Rentrer l'id de l'équipe" required />
                    <p></p>
                    <button type="button" className="btn btn-primary">Rejoindre</button>
                </div>
            </Row>
        </Container>
    );
}

export default PageRejoindreUneEquipe;