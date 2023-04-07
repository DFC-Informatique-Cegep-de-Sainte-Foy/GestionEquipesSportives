import { React, useState, useEffect } from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { BiTrash } from "react-icons/bi";

export const PageUneEquipe = () => {
    const [equipe, setEquipe] = useState({});
    const [nomEquipe, setNomEquipe] = useState('');
    const [region, setRegion] = useState('');
    const [sport, setSport] = useState('');
    const [associationSportive, setAssociationSportive] = useState('');

    const [equipeEvenement, setEquipeEvenement] = useState([]);
    const [listeEvenements, setListeEvenements] = useState([]);
    const [equipeJoueurs, setEquipeJoueurs] = useState([]);
    const [listeJoueurs, setListeJoueurs] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        getEquipe(id);
    }, [equipe.id]);

    useEffect(() => {
        getEvenements(id);
    }, [equipeEvenement.id]);

    useEffect(() => {
        dropdownListeEvenements();
    }, []);

    useEffect(() => {
        getJoueurs(id);
    }, []);

    useEffect(() => {
        dropdownListeJoueurs();
    }, []);
    //recherche information pour equipe avec id
    async function getEquipe(id){
        await fetch(`api/equipe/${id}`)
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            setEquipe(result);
            setNomEquipe(result.nom);
            setRegion(result.region);
            setSport(result.sport);
            setAssociationSportive(result.associationSportive);
        });
    }
    //recherche evenements pour id equipe dans table equipeEvenements
    async function getEvenements(id){
        await fetch(`api/equipeEvenement/${id}`)
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            setEquipeEvenement(result);
        });
    }
    //recherhe tous evenements dans table evenements
    async function dropdownListeEvenements(){
        await fetch("api/evenements")
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            setListeEvenements(result);
        });
    }
    //recherche joueurs pour id equipe dans table equipeJoueurs
    async function getJoueurs(id){
        await fetch(`api/equipeJoueur/${id}`)
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            setEquipeJoueurs(result);
        });
    }
    //recherche tous joueurs dans table utilisateurs pour dropdownliste
    async function dropdownListeJoueurs(){
        await fetch("api/utilisateur")
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            setListeJoueurs(result);
        });
    }
    //ajout selected evenemement dans cette equipe dans table equipeEvenement
    async function onSelectEvenement(idEvenement){
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                FK_Id_Evenement: idEvenement,
                FK_Id_Equipe: id
            })
        };
        await fetch('api/equipeEvenement', requestOptions)
            .then(function (reponse) {
                console.log(reponse);
            }).catch(function (error) {
                console.log(error)
            })

        getEvenements(id);
    }
    //ajout selected joueur dans cette equipe dans table equipeJoueur
    async function onSelectJoueur(idJoueur){
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                FK_Id_Utilisateur: idJoueur,
                FK_Id_Equipe: id
            })
        };
        await fetch('api/equipeJoueur', requestOptions)
            .then(function (reponse) {
                console.log(reponse);
            }).catch(function (error) {
                console.log(error)
            })

            getJoueurs(id);
    }

    const listeDropdownEvenements = listeEvenements.map((liste) => {
        return <option key={liste.id} value={liste.id}>{liste.description}</option>
    });

    const listeDropdownJoueur = listeJoueurs.map((liste) => {
        return <option key={liste.idUtilisateur} value={liste.idUtilisateur}>{liste.nom}</option>
    });
    //supprimer cet evenement dans cette equipe dans table equipeEvenement
    async function supprimerEvenementFromEquipe(idEvenementDansList){
        console.log(idEvenementDansList);

        let requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                FK_Id_Evenement: idEvenementDansList,
                FK_Id_Equipe: id
            })
        };
        await fetch(`/api/equipeEvenement`, requestOptions);

        getEvenements(id);
    }
    //supprimer joueur dans cette equipe dans table equipeJoueur
    async function supprimerJoueurFromEquipe(idJoueurDansListe){
        console.log(idJoueurDansListe);

        let requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                FK_Id_Utilisateur: idJoueurDansListe,
                FK_Id_Equipe: id
            })
        };
        await fetch("api/equipeJoueur", requestOptions);

        getJoueurs(id);
    }

    return (
        <>
            <Container>
                <Row>
                    <h2>Équipe - {nomEquipe}</h2>
                    <Link to={'/equipes'}>
                        <Button variant='success' className="mb-3">Retour à la page des équipes</Button>
                    </Link>
                    <p>Region - {region}</p>
                    <p>Sport - {sport}</p>
                    <p>Association Sportive - {associationSportive}</p>                    
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <h5>Liste des participants</h5>
                            </Col>
                            <Col>
                                <p style={{display: 'inline-block'}} >Ajouter :</p>
                                <select onChange={event => onSelectJoueur(event.target.value)} className='float-end'>
                                    <option selected disabled>Choisir joueur</option>
                                    {listeDropdownJoueur}
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Table striped bordered>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nom</th>
                                        <th>Prenom</th>
                                        <th>Email</th>
                                        <th>Téléphone</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {equipeJoueurs.map((j, index) => (
                                        <tr key={j.idUtilisateur}>
                                            <td>{index + 1}</td>
                                            <td>{j.nom}</td>
                                            <td>{j.prenom}</td>
                                            <td>{j.email}</td>
                                            <td>{j.numTelephone}</td>
                                            <td>
                                                <Button variant='danger' onClick={() => supprimerJoueurFromEquipe(j.idUtilisateur)} size="sm" title="Supprimer" ><BiTrash /></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h5>Liste des événements</h5>
                            </Col>
                            <Col>
                                <p style={{display: 'inline-block'}} >Ajouter :</p>
                                <select onChange={event => onSelectEvenement(event.target.value)} className="float-end">
                                    <option selected disabled>Choisir événement</option>
                                    {listeDropdownEvenements}
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Table striped bordered>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Description</th>
                                        <th>Emplacement</th>
                                        <th>Date de début</th>
                                        <th>Date de fin</th>
                                        <th>Type événement</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {equipeEvenement.map((e, index) => (
                                        <tr key={e.id}>
                                            <td>{index+1}</td>
                                            <td>{e.description}</td>
                                            <td>{e.emplacement}</td>
                                            <td>{e.dateDebut}</td>
                                            <td>{e.dateFin}</td>
                                            <td>{e.typeEvenement}</td>
                                            <td>
                                                <Button variant='danger' onClick={() => supprimerEvenementFromEquipe(e.id)} size="sm" title="Supprimer" ><BiTrash /></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}