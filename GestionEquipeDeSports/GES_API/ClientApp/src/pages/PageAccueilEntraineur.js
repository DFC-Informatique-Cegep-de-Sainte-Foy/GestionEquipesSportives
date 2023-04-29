import React, { useEffect, useState } from "react";
import { Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { TableEvenementsUtilisateur } from "../components/TableEvenementsUtilisateur";
import { TableEquipesUtilisateur } from "../components/TableEquipesUtilisateur";
import { IdUtilisateurContext } from "../components/Context";

export const PageAcceuilEntraineur = () => {
    const [utilisateur, setUtilisateur] = useState({});
    const [idUtilisateur, setIdUtilisateur] = useState('');

    const [equipes, setEquipes] = useState([]);
    const [evenements, setEvenements] = useState([]);
    const [utilisateurEvenement, setUtilisateurEvenement] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const { user } = useAuth0();

    useEffect(() => {
        getUtilisateur(user.email);
    }, []);

    // useEffect(() => {
    //     getEquipesDeJoueur(idUtilisateur);
    // }, []);

    // useEffect(() => {
    //     getEvenementsDeJoueur(idUtilisateur);
    // }, [idUtilisateur]);

    useEffect(() => {
        async function trouverEvenementsPourUtilisateur(){
            await evenements.map((ev) => obtenirEvenementAPartirSonId(ev.fk_Id_Evenement));
        }
        trouverEvenementsPourUtilisateur()
            .catch(console.error);
    }, [evenements]);

    //trouver utilisateur dans BD par son email
    async function getUtilisateur(email){
        var id;
        const token = await getAccessTokenSilently();
        // console.log(email);
        await fetch(`api/utilisateur/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            id = result.idUtilisateur;
            setIdUtilisateur(result.idUtilisateur);
            setUtilisateur(result);
            // setRoleUtilisateur(result.roles);            
        }).catch(function (error) {
            console.log(error);
        });

        await fetch(`api/UtilisateurEquipe/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
          })
            .then(res => res.json())
            .then((result) => {
                // console.log('Equipes :');
                // console.log(result);
                setEquipes(result);
            }).catch(function (error) {
                console.log(error);
            });

        await fetch(`api/evenementJoueur/${id}`, {
                headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
              })
                .then(res => res.json())
                .then((result) => {
                    // console.log('Evenements :');
                    // console.log(result);
                    setEvenements(result);
                }).catch(function (error) {
                    console.log(error);
                });
    }

    // async function getEquipesDeJoueur(id){
    //     const token = await getAccessTokenSilently();
    //     console.log(id);
    //     await fetch(`api/UtilisateurEquipe/${id}`, {
    //         headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    //       })
    //         .then(res => res.json())
    //         .then((result) => {
    //             console.log('Equipes :');
    //             console.log(result);
    //             setEquipes(result);
    //         }).catch(function (error) {
    //             console.log(error);
    //         });
    // }

    // async function getEvenementsDeJoueur(id){
    //     const token = await getAccessTokenSilently();

    //     await fetch(`api/evenementJoueur/${id}`, {
    //         headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    //       })
    //         .then(res => res.json())
    //         .then((result) => {
    //             console.log('Evenements :');
    //             console.log(result);
    //             setEvenements(result);
    //         }).catch(function (error) {
    //             console.log(error);
    //         });
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
        let arrayEvenements = [];
        arrayEvenements = utilisateurEvenement;
        const token = await getAccessTokenSilently();
        await fetch(`api/evenements/${idEvenement}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                // console.log(result); 
                arrayEvenements.push(result);
                setUtilisateurEvenement([...arrayEvenements]);
        }).catch(function (error) {
            console.log(error);
        });
    }

// console.log(utilisateurEvenement);
    return (
        <>
        <Container>
            <Row>
                <Col style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>Bienvenue dans votre compte</Col>
            </Row>
            <p></p>
            <Row>
                <Col>
                    <h5>Liste de vos équipes</h5>
                </Col>
                <Col>
                    <Button variant="success" className="float-end" onClick={() => navigate("/formulaireEquipe")}>Créer une équipe</Button>
                </Col>
            </Row>
            <p></p>
            <Row style={{maxHeight: "200px", overflow: "auto"}}>
                <TableEquipesUtilisateur eq={equipes} />
            </Row>
            <Row style={{marginTop: "1.5em"}}>
                <Col>
                    <h5>Vos événements à venir</h5>
                </Col>
            </Row>
            <Row>
                <IdUtilisateurContext.Provider value={idUtilisateur} >
                    <TableEvenementsUtilisateur ev={utilisateurEvenement} />
                </IdUtilisateurContext.Provider>                
            </Row>
        </Container>
        </>
    )
}