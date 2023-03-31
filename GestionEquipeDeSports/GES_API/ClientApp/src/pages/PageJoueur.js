import { React, useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";

export const PageJoueur = () => {
    const [evenements, setEvenements] = useState({});
    const [equipes, setEquipes] = useState([]);
    const [description, setDescription] = useState('');
    const { id } = useParams();

    async function recupereInformationsEvenements() {


    }

    async function recupereInformationsEquipes() {

    }

    useEffect(() => {
        recupereInformationsEvenements();
        recupereInformationsEquipes();
    }, []);


    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1>Événements</h1>
                        <ul>
                            {/* {evenements.map((evenement) => (
                                <li key={evenement.id}>
                                    <Link to={`/evenements/${evenement.id}`}>{evenement.description}</Link>
                                </li>
                            ))} */}
                        </ul>
                    </Col>
                    <Col>
                        <h1>Équipes</h1>
                        <ul>
                            {/* {equipes.map((equipe) => (
                                <li key={equipe.id}>
                                    <Link to={`/equipes/${equipe.id}`}>{equipe.nom}</Link>
                                </li>
                            ))} */}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

