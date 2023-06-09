import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import EvenementService from '../services/EvenementService.js';

export const PageSupprimerEvenement = () => {
    const [evenement, setEvenement] = useState({});
    const { getAccessTokenSilently } = useAuth0();
    const [loading, setLoading] = useState(true);

    async function getEvenement(id) {
        const token = await getAccessTokenSilently();

        await fetch(`api/evenements/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                setEvenement(result);
                setLoading(false);
            });
    }

    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        getEvenement(id);
    }, [evenement.id]);

    async function supprimerEvenement() {
        const token = await getAccessTokenSilently();
        console.log("ACCESS TOKEN: " + token);

        const optionsRequete = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        await fetch(`/api/evenements/${id}`, optionsRequete)
            .then(function (reponse) {
                if(reponse.ok) {
                    //redirect to evenements
                    window.location.href = "/evenements";
                }
                console.log(reponse);
            }).catch(function (error) {
                console.log(error)
            }
            )
    }

    return (
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
                    <Col>{EvenementService.affichageTypeEvenement(evenement.typeEvenement)}</Col>
                </Row>

                <Button className="me-4" variant='primary' onClick={supprimerEvenement}>Oui, supprimer l'événement</Button>
                <Link to={'/evenements'}>
                    <Button className="me-2" variant='danger'>Non, laisser l'événement</Button>
                </Link>
            </Container>
        </>
    )
}