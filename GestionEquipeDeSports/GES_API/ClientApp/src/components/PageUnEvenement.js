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
        await fetch(`api/equipeEvenement/${id}`)
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

    return (
        <>
            <div>
                <Row>
                    <h2>Votre événement - {typeEvenement} </h2>
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
                                <tr key={e.id}>
                                    <td>{index+1}</td>
                                    <td>{e.nom}</td>
                                    <td>{e.region}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </div>
        </>
    )   
}
