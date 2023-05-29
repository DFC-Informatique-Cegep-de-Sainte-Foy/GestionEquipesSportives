import React, { useState, useEffect } from "react";
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { BiCheck, BiX } from "react-icons/bi";
import '../styles/pageUnEvenement.css';
import { CalculerDuree } from '../components/CalculerDuree';
import { FormatDateTime } from "../components/FormatDateTime";

export const PageUnEvenement = () => {
    const [evenement, setEvenement] = useState(null);

    const [membresEquipeEvenement, setMembresEquipeEvenement] = useState([]);

    const [presenceDesMembres, setPresencesDesMembres] = useState([]);

    const [isAttending, setIsAttending] = useState(false);
    const [utilisateur, setUtilisateur] = useState({});

    const { getAccessTokenSilently, user } = useAuth0();
    const navigate = useNavigate();
    const { id } = useParams();

    const loadUtilisateur = async () => {
        const token = await getAccessTokenSilently();
        fetch(`api/utilisateur/${user.name}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        }).then((res) => {
            return res.json();
        }).then((data) => {
            setUtilisateur(data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const loadEvenement = async () => {
        const token = await getAccessTokenSilently();

        fetch(`api/evenements/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        }).then((res) => {
            return res.json();
        }
        ).then((data) => {
            setEvenement(data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const loadPresenceUser = async () => {
        const token = await getAccessTokenSilently();

        //load presence of the user       
        fetch(`api/EvenementJoueurPresence/${id}?yourParam=${user.name}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        }).then((res) => {
            return res.json();
        }
        ).then((data) => {
            if (data === true) {
                setIsAttending(true);
            }
            else {
                setIsAttending(false);
            }
        });
    }

    const loadMembresEquipeEvenement = async () => {
        const token = await getAccessTokenSilently();

        fetch(`api/EquipeJoueurEvenement/${utilisateur.idUtilisateur}?idEvenement=${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            else {
                return res.json();
            }
        }).then((data) => {
            setMembresEquipeEvenement(data);
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleClickAbsence = async () => {
        setIsAttending(false);
        const token = await getAccessTokenSilently();
        let etat = false;

        let requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                FK_Id_Utilisateur: utilisateur.idUtilisateur,
                FK_Id_Evenement: id,
                EstPresentAEvenement: etat
            })
        };

        fetch(`api/EvenementJoueur`, requestOptions
        ).then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
        }).catch((error) => {
            // Handle any errors that occurred during the fetch operation
            console.error("There was a problem with the fetch operation:", error);
        });
    }

    const handleClickPresence = async () => {
        setIsAttending(true);
        const token = await getAccessTokenSilently();
        let etat = true;

        let requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                FK_Id_Utilisateur: utilisateur.idUtilisateur,
                FK_Id_Evenement: id,
                EstPresentAEvenement: etat
            })
        };

        fetch(`api/EvenementJoueur`, requestOptions
        ).then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
        }).catch((error) => {
            // Handle any errors that occurred during the fetch operation
            console.error("There was a problem with the fetch operation:", error);
        });
    }

    const loadPresencesDesMembres = async () => {
        const token = await getAccessTokenSilently();       

        await fetch(`api/EvenementJoueurPresence/${id}`, {
        }).then((res) => {

            return res.json();
        }
        ).then((data) => {
            setPresencesDesMembres(data);
        }
        ).catch((error) => {
            console.log(error);
        }
        );
    }

    useEffect(() => { loadEvenement() }, []);
    useEffect(() => { loadPresenceUser() }, []);
    useEffect(() => { loadUtilisateur() }, []);

    useEffect(() => {
        if (evenement !== null) {
            loadMembresEquipeEvenement();           
        }        
    }, [utilisateur]);

    useEffect(() => {
        if (membresEquipeEvenement !== null) {
            loadPresencesDesMembres()
        }
    }, [membresEquipeEvenement]);

    

    if (evenement === null) {
        return <div>Chargement...</div>;
    }

    return (
        <>
            <div>
                <Row className="Row mt-3">
                    <Col>
                        <h1>Nom de l'événement: {evenement.description}</h1>
                    </Col>
                    <br></br>
                    <Col>
                        <Button className="ml-auto bg-success" onClick={handleClickPresence}>Confirmer ma présence</Button>
                        <Button className="ml-auto bg-danger mx-2" onClick={handleClickAbsence}>Annuler ma présence</Button>
                        <Button className="ml-auto bg-warning" onClick={() => navigate(`/modifieEvenement/${id}`)}>Modifier l'événement</Button>
                    </Col>
                    <br></br>
                    <Col>
                        <h5>Statut :
                            {isAttending === true ? "  Présent" : "  Absent"}
                        </h5>

                    </Col>
                </Row>

                <Row className="Row">
                    <h5 className="travelcompany-input">
                        <span className="">Lieu de l'événement: {evenement.emplacement}</span>
                    </h5>
                    <Col>
                        <h5>
                            <span className="">Date de début: <FormatDateTime doneesDateTime={evenement.dateDebut} /></span>
                        </h5>
                    </Col>
                    <Col>
                        <h5>
                            <span className="">Durée: <CalculerDuree dateACalculer={[evenement.dateDebut, evenement.dateFin]} /></span>
                        </h5>
                    </Col>
                </Row>

                <Row className="Row">
                    <h5>Membres de l'équipe</h5>
                    {membresEquipeEvenement && membresEquipeEvenement.length > 0 ?
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Prenom</th>
                                    <th>Nom</th>
                                    <th>Numero</th>
                                    <th>Email</th>
                                    <th>Presence</th>
                                </tr>
                            </thead>
                            <tbody>
                                {membresEquipeEvenement.map((e, index) => (
                                    <tr key={e.idUtilisateur}>
                                        <td>{e.prenom}</td>
                                        <td>{e.nom}</td>
                                        <td>{e.numTelephone}</td>
                                        <td>{e.email}</td>
                                        <td>{e.estPresentAEvenement === true ? "Présent" : "Absent"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        : <p>Aucun membre d'équipe n'a été trouvé.</p>}
                </Row>
            </div>
        </>
    )
}
