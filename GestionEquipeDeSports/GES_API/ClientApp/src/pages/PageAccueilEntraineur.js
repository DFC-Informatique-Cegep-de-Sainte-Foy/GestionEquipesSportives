import React, { useEffect, useState } from "react";
import { Button, Table, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { TableEvenementsUtilisateur } from "../components/TableEvenementsUtilisateur";
import { ListeEquipesPourUtilisateur } from "../components/ListeEquipesPourUtilisateur";

export const PageAcceuilEntraineur = () => {
    const [utilisateur, setUtilisateur] = useState({});
    const [idUtilisateur, setIdUtilisateur] = useState('');
    const [roleUtilisateur, setRoleUtilisateur] = useState('');

    const [equipes, setEquipes] = useState([]);
    const [evenements, setEvenements] = useState([]);
    const [utilisateurEvenement, setUtilisateurEvenement] = useState([]);
    const [evenementRender, setEvenementRender] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    var arrayEvenements = [];
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

    useEffect(() => {
        async function trouverEvenementsPourUtilisateur(){
            await evenements.map((ev) => obtenirEvenementAPartirSonId(ev.fk_Id_Evenement));
        }
        trouverEvenementsPourUtilisateur()
            .catch(console.error);
    }, [evenements]);

    //trouver utilisateur dans BD par son email
    async function getUtilisateur(email){
        const token = await getAccessTokenSilently();

        await fetch(`api/utilisateur/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            setIdUtilisateur(result.idUtilisateur);
            setUtilisateur(result);
            setRoleUtilisateur(result.roles);            
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
            }).catch(function (error) {
                console.log(error);
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
            }).catch(function (error) {
                console.log(error);
            });
    }

    // async function trouverEvenementsPourUtilisateur(){
    //     await evenements.map((ev) => obtenirEvenementAPartirSonId(ev.fk_Id_Evenement));
    //     // console.log('mapEvenements :');
    //     // console.log(mapEvenements);
    // }

    function convertirPresence(donnees){
        let etatAReturn;
        if(donnees === true){
            etatAReturn = <td style={{color: "green"}}>PRESENT</td>
        }else{
            etatAReturn = <td style={{color: "red"}}>absent</td>
        }
        return etatAReturn;
    }

    async function obtenirEvenementAPartirSonId(idEvenement){
        // let arrayEvenements = [];
        arrayEvenements = utilisateurEvenement;
        const token = await getAccessTokenSilently();
        await fetch(`api/evenements/${idEvenement}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result); 
                // setUtilisateurEvenement(result);
                arrayEvenements.push(result);
                // setUtilisateurEvenement([...utilisateurEvenement, result]);
                setUtilisateurEvenement(arrayEvenements);
        }).catch(function (error) {
            console.log(error);
        });
        // setUtilisateurEvenement(arrayEvenements);
        setEvenementRender(arrayEvenements);
    }

console.log(utilisateurEvenement);
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
            <p></p>
            <Row style={{maxHeight: "200px", overflow: "auto"}}>
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
                    <ListeEquipesPourUtilisateur eq={equipes} />
                </Table>
            </Row>
            <Row style={{marginTop: "1.5em"}}>
                <Col>
                    <h5>Vos événements à venir</h5>
                </Col>
            </Row>
            <Row>
                <TableEvenementsUtilisateur ev={utilisateurEvenement} />
            </Row>
        </Container>
        </>
    )
}