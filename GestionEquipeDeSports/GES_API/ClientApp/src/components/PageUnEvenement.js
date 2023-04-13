import React, { useState, useEffect } from "react";
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useParams, Link, useFetcher } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { BiCheck, BiX } from "react-icons/bi";

export const PageUnEvenement = () => {    
    const [evenement, setEvenement] = useState({});
    const [description, setDescription] = useState('');
    const [emplacement, setEmplacement] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [typeEvenement, setTypeEvenement] = useState('');

    const [equipeEvenement, setEquipeEvenement] = useState([]);
    const [equipeJoueur, setEquipeJoueur] = useState([]);
    const [joueurEvenement, setJoueurEvenement] = useState([]);
    const [joueurPresenceEvenement, setJoueurPresenceEvenement] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const [loading, setLoading] = useState(true);
    
    const {id} = useParams();

    useEffect(() => {
        getEvenement(id);
    }, [evenement.id]);

    useEffect(() => {
        getEquipesDansEvenement(id);
    }, []);

    useEffect(() => {
        trouverJouersPourEquipes();
    }, [equipeEvenement]);

    useEffect(() => {
        listePresenceJoueursPourEvenement();
    }, [joueurPresenceEvenement]);

    async function getEvenement(id){
        const token =  await getAccessTokenSilently();

        await fetch(`api/evenements/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                setEvenement(result);
                setDescription(result.description);
                setEmplacement(result.emplacement);
                setDateDebut(result.dateDebut);
                setDateFin(result.dateFin);
                setTypeEvenement(result.typeEvenement);
                setLoading(false);
        }); 
    }

    async function getEquipesDansEvenement(id){
        const token =  await getAccessTokenSilently();

        await fetch(`api/evenementEquipe/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            setEquipeEvenement(result);
        });
    }

    //recherche joueurs pour id equipe dans table equipeJoueurs
    async function getJoueurs(id){
        const token =  await getAccessTokenSilently();
        
        await fetch(`api/equipeJoueur/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then((result) => {
            console.log('getJoueur :');
            console.log(result);
            result.forEach(element => {
                joueurEvenement.push(element);
            });            
            
            setEquipeJoueur(result);
        });
    }

    async function trouverJouersPourEquipes(){
        await equipeEvenement.map((equipe) => getJoueurs(equipe.idEquipe));
    }

    async function listePresenceJoueursPourEvenement(){
        const token =  await getAccessTokenSilently();
        
        await fetch(`api/evenementJoueur/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then((result) => {
            console.log('Liste presence equipeJoueurs');
            console.log(result);
            if(result.status === 404){
                console.log(' status 404, rien trouvee ');
            }else
            {
                setJoueurPresenceEvenement(result);
            }
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

    function afficherEtatPresence(idUtilisateur){
        let etatAReturn;
        if(joueurPresenceEvenement.length !== 0)
        {
            for(let i = 0; i < joueurPresenceEvenement.length; i++){
                const joueur = joueurPresenceEvenement[i];
                if(joueur.fk_Id_Utilisateur === idUtilisateur){
                    if(joueur.estPresentAevenement === true)
                    {
                        console.log('Est present');
                        etatAReturn = <td style={{color: "green"}}>PRESENT</td>
                        break;
                    }
                    else
                    {
                        console.log('est absent !!!');
                        etatAReturn = <td style={{color: "red"}}>absent</td>
                        break;
                    }
                }
                else{
                    console.log('1 if');
                    etatAReturn = <td style={{color: "grey"}}>inconnu</td>
                }
            }
        }else{
            console.log('2 if');
            etatAReturn = <td style={{color: "grey"}}>inconnu</td>
        }
        return etatAReturn;
    }

    async function changerEtatPresence(idUtilisateur, etat){
        console.log(idUtilisateur);
        console.log(etat);
        //const token =  await getAccessTokenSilently();

        let requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                FK_Id_Utilisateur: idUtilisateur,
                FK_Id_Evenement: id,
                EstPresentAEvenement: etat
            }) 
        };

        await fetch(`api/evenementJoueur`, requestOptions)
        .then(function (reponse) {
            console.log(reponse);

        }).catch(function (error) {
            console.log(error)
        })
        //afficherEtatPresence(idUtilisateur);
        //trouverJouersPourEquipes();
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
                                <th>Presence</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {joueurEvenement.map((e, index) => (
                                <tr key={e.idUtilisateur}>
                                    <td>{index+1}</td>
                                    <td>{e.nom}</td>
                                    <td>{e.prenom}</td>
                                    <td>{e.numTelephone}</td>
                                    <td>{e.email}</td>
                                    {afficherEtatPresence(e.idUtilisateur)}
                                    <td><Button variant='success' onClick={() => changerEtatPresence(e.idUtilisateur, true)} size="sm" className="me-2" title="Est présent"> <BiCheck /></Button>
                                    <Button variant='warning' onClick={() => changerEtatPresence(e.idUtilisateur, false)} size="sm" className="me-2" title="Est absent"> <BiX /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </div>
        </>
    )   
}
