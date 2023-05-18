import React from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function PageRejoindreUneEquipe(){
    return(
        <Container>
            <Row>
                <h2 style={{textAlign: "center"}}>Comment rejoindre une équipe sur 
                    <span className='text-success'> Gestion</span><span className='text-primary'>Equipe</span><span className='text-warning'>Sportive</span>
                </h2>
            </Row>
            <p></p>
            <p></p>
            <Row>
                <Col>
                    <h3 style={{textAlign: "center"}}>1. Le responsable d'équipe vous a invité par email.</h3><p></p>
                    <p >Regardez dans vos emails si vous avez reçu une invitation.<br></br>Dans l'email, copiez l'id de l'équipe et coller le dans le champ ci-dessous.</p>

                    <div>
                        <input type="guid" className="form-control" name="identifiant" placeholder="Rentrer l'id de l'équipe" required />
                        <button type="button" className="btn btn-primary">Rejoindre</button>
                    </div>
                </Col>
            </Row>
         
            



        </Container>
    );
}

export default PageRejoindreUneEquipe;