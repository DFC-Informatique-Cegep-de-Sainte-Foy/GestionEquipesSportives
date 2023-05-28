import React, { useEffect, useState } from "react";
import { Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { TableEvenementsUtilisateur } from "../components/TableEvenementsUtilisateur";
import { TableEquipesUtilisateur } from "../components/TableEquipesUtilisateur";
import { IdUtilisateurContext } from "../components/Context";
import { SauvegarderICal } from "../components/SauvegarderICal";
import UtilisateurConnecteHeader from "../components/UtilisateurConnecteHeader";
import { FcApproval } from "react-icons/fc";

export const PageAcceuilEntraineur = () => {
    const [utilisateur, setUtilisateur] = useState({});
    const [idUtilisateur, setIdUtilisateur] = useState('');

    const [equipes, setEquipes] = useState([]);
    const [evenements, setEvenements] = useState([]);
    const [utilisateurEvenement, setUtilisateurEvenement] = useState([]);
    const [check, setCheck] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const { user } = useAuth0();

    useEffect(() => {
        getUtilisateur(user.email);
    }, []);

    useEffect(() => {
        async function trouverEvenementsPourUtilisateur() {
            evenements.map((ev) => obtenirEvenementAPartirSonId(ev.fk_Id_Evenement));
        }
        trouverEvenementsPourUtilisateur()
            .catch(console.error);
    }, [evenements]);

    //trouver utilisateur dans BD par son email
    async function getUtilisateur(email) {
        var id;
        const token = await getAccessTokenSilently();
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
                setEquipes(result);
            }).catch(function (error) {
                console.log(error);
            });

        await fetch(`api/evenementJoueur/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                setEvenements(result);
            }).catch(function (error) {
                console.log(error);
            });
    }

    async function obtenirEvenementAPartirSonId(idEvenement) {
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

    function exporterVersICal() {
        if (utilisateurEvenement.length !== 0) {
            // console.log('exporter longeur :');
            // console.log(utilisateurEvenement.length);
            return <Button variant="info" onClick={() => SauvegarderICal(utilisateurEvenement)} className="float-end" >Exporter vers ICal</Button>
        }
    }

    function copierLeLien() {
        // il faudra changer ce lien pour publier vers Azur, car il est évident que l'adresse sera différente
        navigator.clipboard.writeText(`https://localhost:44474/api/AbonnerCalendrier/${idUtilisateur}`);
        setCheck(true);
        setSeconds(2);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else {
                setCheck(false);
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [seconds]);

    return (
        <>
            <Container>
                <Row>
                    <UtilisateurConnecteHeader />
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>Bienvenue dans votre compte !</Col>
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
                <Row style={{ maxHeight: "200px", overflow: "auto" }}>
                    <TableEquipesUtilisateur eq={equipes} />
                </Row>
                <Row style={{ marginTop: "1.0em" }}>
                    <Col>
                        <h5>Vos événements à venir</h5>
                    </Col>
                    <Col>
                        {exporterVersICal()}
                        <p>Pour vous abonner:
                            <Button variant="info" onClick={() => { copierLeLien() }} title="AbonnerCalendrier/VotreId" >Copier le lien</Button>
                            {check && <FcApproval />}
                        </p>
                    </Col>
                </Row>
                <Row style={{ marginTop: "1.0em" }}>
                    <IdUtilisateurContext.Provider value={idUtilisateur} >
                        <TableEvenementsUtilisateur ev={utilisateurEvenement} />
                    </IdUtilisateurContext.Provider>
                </Row>
            </Container>
        </>
    )
}