import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

export const PageSupprimerEquipe = () => {
    const [equipe, setEquipe] = useState({});

    async function getEquipe(id){
        await fetch(`api/equipe/${id}`)
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                setEquipe(result);
        }); 
    }

    const {id} = useParams();
    
    console.log(id);

    useEffect(() => {
        getEquipe(id);
    }, []);

    return(
        <>
            <Container>
                <h2 style={{ color: 'red' }}>Voulez-vous vraiment supprimer cette équipe?</h2>
                <Row>
                    <Col sm={2}><b>Nom: </b></Col>
                    <Col>{equipe.nom}</Col>
                </Row>
                <Row>
                    <Col sm={2}><b>Sport: </b></Col>
                    <Col>{equipe.sport}</Col>
                </Row>
                <Row>
                    <Col sm={2}><b>Region: </b></Col>
                    <Col>{equipe.region}</Col>
                </Row>
                <Row>
                    <Col sm={2}><b>Association Sportive: </b></Col>
                    <Col>{equipe.associationSportive}</Col>
                </Row>

                <Button  className="me-4" variant='primary' onClick={() => fetch(`/api/equipe/${id}`, {method: "DELETE"}).then( function(reponse){if(reponse.status == 204){console.log('supprimer avec success');}})}>Oui, supprimer l'équipe</Button>
                <Link to={'/equipes'}>
                    <Button  className="me-2" variant='danger'>Non, laisser l'équipe</Button>
                </Link>
            </Container>
        </>
    )
}