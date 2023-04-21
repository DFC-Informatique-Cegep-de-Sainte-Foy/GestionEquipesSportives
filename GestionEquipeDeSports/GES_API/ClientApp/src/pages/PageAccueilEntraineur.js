import React, { useEffect, useState } from "react";
import { Button, Table, Row, Col, Container } from 'react-bootstrap';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

export const PageAcceuilEntraineur = () => {
    const [utilisateur, setUtilisateur] = useState({});
    const [idUtilisateur, setIdUtilisateur] = useState('');
    const [roleUtilisateur, setRoleUtilisateur] = useState('');

    const [equipes, setEquipes] = useState([]);
    const [evenements, setEvenements] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const { user } = useAuth0();

    useEffect(() => {
        getUtilisateur(user.email);
    }, []);

    useEffect(() => {
        getEquipesDeJoueur(idUtilisateur);
    }, [idUtilisateur]);

    useEffect(() => {
        getEvenementsDeJoueur(idUtilisateur);
    }, [idUtilisateur]);

    //trouver utilisateur dans BD par son email
    async function getUtilisateur(email){
        const token = await getAccessTokenSilently();

        await fetch(`api/utilisateur/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            setUtilisateur(result);
            setRoleUtilisateur(result.roles);
            setIdUtilisateur(result.idUtilisateur);
        });
    }

    async function getEquipesDeJoueur(id){
        const token = await getAccessTokenSilently();
console.log('Id Utilisateur');
console.log(id);
        await fetch(`api/UtilisateurEquipe/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
          })
            .then(res => res.json())
            .then((result) => {
                console.log('Equipes :');
                console.log(result);
                setEquipes(result);
            });
    }

    async function getEvenementsDeJoueur(id){
        const token = await getAccessTokenSilently();

        await fetch(`api/evenementJoueur/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
          })
            .then(res => res.json())
            .then((result) => {
                console.log('Evenements :');
                console.log(result);
                setEvenements(result);
            });
    }

    function convertirPresence(donnees){
        if(donnees === "true"){
            return "Present";
        }else{
            return "absent";
        }
    }

    return (
        <>
        <Container>
            <Row>
                <Col>
                    <h5>Liste des équipes</h5>
                </Col>
                <Col>Bonjour {utilisateur.prenom}!</Col>
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
                            <th>Presence</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {evenements.map((e, index) => (
                            <tr key={e.idEvenementJoueur}>
                                <td>{index + 1}</td>
                                <td>{e.fk_Id_Evenement}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
        </>
    )
}