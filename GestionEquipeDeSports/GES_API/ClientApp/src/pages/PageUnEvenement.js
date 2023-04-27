import React, { useState, useEffect } from "react";
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { BiCheck, BiX } from "react-icons/bi";
import './pageUnEvenement.css';

export const PageUnEvenement = () => {
    const [evenement, setEvenement] = useState(null);

    const [membresEquipeEvenement, setMembresEquipeEvenement] = useState([]);

    const [isAttending, setIsAttending] = useState(false);
    const [utilisateur, setUtilisateur] = useState({});

    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const { user } = useAuth0();
    

    //console.log('user : ');
    //console.log(user);

    function formatDateTime(donnees) {
        var dateTimeEntree = donnees;
        var date = dateTimeEntree.split('T').join(' ');
        return date.substring(0, 16);
    }

    const loadEvenement = async () => {
        const token = await getAccessTokenSilently();

        fetch(`api/evenements/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        }).then((res) => {
            //console.log(res);
            return res.json();
        }
        ).then((data) => {
            setEvenement(data);
            //console.log('evenement : ');
            //console.log(evenement);
        });
    }

    function handleClickPresence() {
        setIsAttending(true);
    }

    const handleClickAbsence = async () => {
        setIsAttending(false);
        const token = await getAccessTokenSilently();
        var email = user.email;

        // let requestOptions = {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        //     body: JSON.stringify({
        //         FK_Id_Utilisateur: idUt,
        //         FK_Id_Evenement: id,
        //         EstPresentAEvenement: etat
        //     })
        // };

        fetch(`api/EvenementJoueurPresence/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ email, estPresent: false }), // Send the email and isAttending value as the request payload
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .catch((error) => {
                // Handle any errors that occurred during the fetch operation
                console.error("There was a problem with the fetch operation:", error);
            });
    }

    const loadPresence = async () => {
        const token = await getAccessTokenSilently();
        // const encodedString = encodeURIComponent(user.id);
        //console.log(user.id);
        //load presence of the user       
        fetch(`api/EvenementJoueurPresence/${id}?yourParam=${user.name}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        }).then((res) => {
            //console.log(res);
            return res.json();
        }
        ).then((data) => {
            //console.log(data);
            if (data === true) {
                setIsAttending(true);
            }
            else {
                setIsAttending(false);
            }
        });
    }

    useEffect(() => { loadEvenement() }, []);
    useEffect(() => { loadPresence() }, []);

    if (evenement === null) {
        return <div>Chargement...</div>;
    }

    return (
        <>
            <div>
                <Row className="Row mt-3">
                    <Col>
                        <h1>Votre événement - {evenement.description} </h1>
                    </Col>
                    <Col>
                        <Button className="ml-auto bg-success" onClick={handleClickPresence}>Confirmer ma présence</Button>
                        <Button className="ml-auto bg-danger mx-2" onClick={handleClickAbsence}>Annuler ma présence</Button>
                    </Col>
                    <Col>
                        <h5>Présence :
                            {isAttending === true ? "  Présent" : "  Absent"}
                        </h5>

                    </Col>
                </Row>

                <Row className="Row">

                    <h4 className="travelcompany-input">
                        <span className="">Emplacement de l'événement - {evenement.emplacement}</span>
                    </h4>
                    <Col>
                        <h5>
                            <span className="">Date de début - {formatDateTime(evenement.dateDebut)}</span>

                            <span className=""> Durée : {evenement.duree} heures</span>
                        </h5>
                    </Col>
                </Row>

                {/* <Row className="Row">
                    {Object.keys(evenement)
                        .filter(keyName => keyName === "description" || keyName === "emplacement" || keyName === "dateDebut" || keyName === "duree")
                        .map((keyName, i) => (
                            <h4 className="travelcompany-input" key={i}>
                                <span className="input-label">{keyName} -- {evenement[keyName]}</span>
                            </h4>
                        ))}
                </Row> */}

                <Row className="Row">
                    <h5>Membres de l'équipe</h5>

                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Numero</th>
                                <th>Email</th>
                                <th>Presence</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {membresEquipeEvenement.map((e, index) => (
                                <tr key={e.idUtilisateur}>
                                    <td>{e.nom}</td>
                                    <td>{e.prenom}</td>
                                    <td>{e.numTelephone}</td>
                                    <td>{e.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </div>
        </>
    )
}
