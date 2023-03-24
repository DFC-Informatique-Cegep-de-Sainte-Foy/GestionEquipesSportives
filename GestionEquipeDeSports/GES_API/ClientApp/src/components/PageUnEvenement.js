import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";

export const PageUnEvenement = () => {    
    const [evenement, setEvenement] = useState({});
    const [description, setDescription] = useState('');
    const [emplacement, setEmplacement] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [typeEvenement, setTypeEvenement] = useState('');
    

    function getEvenement(id){
        fetch(`api/evenements/${id}`)
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

    const {id} = useParams();
    
    console.log(id);
    console.log(description);
    console.log(emplacement);

    useEffect(() => {
        getEvenement(id);
    }, [evenement.id]);

    function formatDateTime(donnees) {
        var dateTimeEntree = donnees;
        var date = dateTimeEntree.split('T').join(' ');
        return date.substring(0, 16);
    }

    return (
        <>
            <div>
                <h2>Votre événement - {typeEvenement} </h2>
                <p>Description - {description}</p>
                <p>Lieu - {emplacement}</p>
                <p>Date début - {formatDateTime(dateDebut)}</p>
                <p>Date fin - {formatDateTime(dateFin)}</p>
                <Link to={'/evenements'}>
                    <Button variant="success" className="float-end">Retour à la page des événements</Button>
                </Link>
            </div>
        </>
    )   
}
