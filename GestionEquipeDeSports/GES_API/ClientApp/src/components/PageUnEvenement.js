import React, { useState, useEffect } from "react";
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";

export const PageUnEvenement = () => {    
    const [evenement, setEvenement] = useState({});
    const [description, setDescription] = useState('');
    const [emplacement, setEmplacement] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [typeEvenement, setTypeEvenement] = useState('');

    const [equipeEvenement, setEquipeEvenement] = useState([]);
    
    const {id} = useParams();

    useEffect(() => {
        getEvenement(id);
    }, [evenement.id]);

    useEffect(() => {
        getEquipesDansEvenement(id);
    }, []);

    async function getEvenement(id){
        await fetch(`api/evenements/${id}`)
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                setEvenement(result);
                setDescription(result.description);
                setEmplacement(result.emplacement);
                setDateDebut(result.dateDebut);
                setDateFin(result.dateFin);
                setTypeEvenement(result.typeEvenement);
        }); 
    }

    async function getEquipesDansEvenement(id){
        await fetch(`api/evenementEquipe/${id}`)
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            setEquipeEvenement(result);
        });
    }

    function formatDateTime(donnees) {
        var dateTimeEntree = donnees;
        var date = dateTimeEntree.split('T').join(' ');
        return date.substring(0, 16);
    }

    function affichageTypeEvenement(data){
        if(data === 0){
            return "Entrainement";
        } else if(data === 1){
            return "Partie";
        } else if (data === 2){
            return "Autre";
        }else{
            return data;
        }
    }

    return (
        <>
            <div>
                <Row>
                    <h2>Votre événement - {affichageTypeEvenement(typeEvenement)} </h2>
                    <Link to={'/evenements'}>
                        <Button variant="success">Retour à la page des événements</Button>
                    </Link>
                    <p>Description - {description}</p>
                    <p>Lieu - {emplacement}</p>
                    <p>Date début - {formatDateTime(dateDebut)}</p>
                    <p>Date fin - {formatDateTime(dateFin)}</p>                    
                </Row>
                <Row>
                    <Col>
                        <h5>Liste des équipes</h5>
                    </Col>
                </Row>
                <Row>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nom</th>
                                <th>Region</th>
                                <th>Sport</th>
                                <th>Association Sportive</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipeEvenement.map((e, index) => (
                                <tr key={e.idEquipe}>
                                    <td>{index+1}</td>
                                    <td>{e.nom}</td>
                                    <td>{e.region}</td>
                                    <td>{e.sport}</td>
                                    <td>{e.associationSportive}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
                <Row>
                    <h5>Liste des participants</h5>
                </Row>
                <Row>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Numero</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </Table>
                </Row>
            </div>
        </>
    )   
}
