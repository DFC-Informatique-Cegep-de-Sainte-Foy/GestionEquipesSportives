import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

export const PageSupprimerEvenement = () => {
    const [evenement, setEvenement] = useState({});

    function getEvenement(id){
        fetch(`api/evenements/${id}`)
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                setEvenement(result);
                // setDescription(result.description);
                // setEmplacement(result.emplacement);
                // setDateDebut(result.dateDebut);
                // setDateFin(result.dateFin);
                // setTypeEvenement(result.typeEvenement);
        }); 
    }

    const {id} = useParams();
    
    console.log(id);

    useEffect(() => {
        getEvenement(id);
    }, [evenement.id]);

    return(
        <>
            <Container>
                <h2 style={{ color: 'red' }}>Voulez-vous vraiment supprimer cet événement?</h2>
                <Row>
                    <Col sm={2}><b>Description: </b></Col>
                    <Col>{evenement.description}</Col>
                </Row>
                <Row>
                    <Col sm={2}><b>Emplacement: </b></Col>
                    <Col>{evenement.emplacement}</Col>
                </Row>
                <Row>
                    <Col sm={2}><b>Date de début: </b></Col>
                    <Col>{evenement.dateDebut}</Col>
                </Row>
                <Row>
                    <Col sm={2}><b>Date de fin: </b></Col>
                    <Col>{evenement.dateFin}</Col>
                </Row>
                <Row>
                    <Col sm={2}><b>Type événement: </b></Col>
                    <Col>{evenement.typeEvenement}</Col>
                </Row>

                <Button  className="me-4" variant='primary' onClick={() => fetch(`/api/evenements/${id}`, {method: "DELETE"})}>Oui, supprimer l'événement</Button>
                <Link to={'/evenements'}>
                    <Button  className="me-2" variant='danger'>Non, laisser l'événement</Button>
                </Link>
            </Container>
        </>
    )
}