import React, { useEffect, useState } from "react";
import { Button, Table, Row, Col, Container } from 'react-bootstrap';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

export const PageAcceuilEntraineur = () => {
    //const [entraineur, setEntraineur] = useState({});
    //const [nom, setNom] = useState('');

    const [equipes, setEquipes] = useState([]);
    //const [evenements, setEvenements] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        getEquipes();
    }, []);

    async function getEquipes(){
        const token = await getAccessTokenSilently();

        await fetch("api/Equipe", {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
          })
            .then(res => res.json())
            .then((result) => {
                setEquipes(result);
            });
    }

    return (
        <>
        <Container>
            <Row>
                <Col>
                    <h5>Liste des équipes</h5>
                </Col>
                <Col>
                    <Button variant="success" className="float-end" onClick={() => navigate("/formulaireEquipe")}>Créer une équipe</Button>
                </Col>
            </Row>
            <Row style={{height: "200px", overflow: "auto"}}>
                <Table striped bordered >
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
                        {equipes.map((e, index) => (
                            <tr key={e.idEquipe}>
                                <td>{index + 1}</td>
                                <td>{e.nom}</td>
                                <td>{e.region}</td>
                                <td>{e.sport}</td>
                                <td>{e.associationSportive}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
            <Row style={{marginTop: "1.5em"}}>
                <Col>
                    <h5>Votre événements à venir</h5>
                </Col>
            </Row>
            <Row>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom événement</th>
                            <th>Date début</th>
                            <th>Durée</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </Table>
            </Row>
        </Container>
        </>
    )
}