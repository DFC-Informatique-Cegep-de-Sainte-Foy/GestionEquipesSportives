import { React, useState, useEffect } from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

export const PageUneEquipe = () => {
    const [equipe, setEquipe] = useState({});
    const [nomEquipe, setNomEquipe] = useState('');
    const [region, setRegion] = useState('');
    const [sport, setSport] = useState('');
    const [associationSportive, setAssociationSportive] = useState('');

    function getEquipe(id){
        fetch(`api/equipe/${id}`)
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            setEquipe(result);
            setNomEquipe(result.nom);
            setRegion(result.region);
            setSport(result.sport);
            setAssociationSportive(result.associationSportive);
        });
    }

    const {id} = useParams();

    useEffect(() => {
        getEquipe(id);
    }, [equipe.id]);

    return (
        <>
            <Container>
                <Row>
                    <h2>Équipe - {nomEquipe}</h2>
                    <p>Region - {region}</p>
                    <p>Sport - {sport}</p>
                    <p>Association Sportive - {associationSportive}</p>
                    <Link to={'/equipes'}>
                        <Button variant='success' className="mb-3">Retour à la page des équipes</Button>
                    </Link>
                </Row>
                <Row>
                    <Col>
                        <h5>Liste des participants</h5>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Email</th>
                                    <th>Téléphone</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </Table>
                    </Col>
                    <Col>
                        <h5>Liste des événements</h5>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Description</th>
                                    <th>Emplacement</th>
                                    <th>Date de début</th>
                                    <th>Date de fin</th>
                                    <th>Type événement</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}