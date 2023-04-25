import React, { useEffect, useState } from "react";
import { Button, Table, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { BiCheck, BiX } from "react-icons/bi";

const CalculerDuree = (props) =>{
    let dateDebut = props.dateACalculer[0];
    let dateFin = props.dateACalculer[1];
    let dateDebutParsed = Date.parse(dateDebut);
    let dateFinParsed = Date.parse(dateFin);
    let result = (dateFinParsed - dateDebutParsed) / 60000;
    if(result > 60){
        let dureeH = result / 60;
        let dureeM = result % 60;
        return (
            <td>
                {dureeH}H {dureeM}min
            </td>
        )
    }
    else{
        return (
            <td>
                {result}min
            </td>
        )
    }
}

const FormatDateTime = (props) =>{    
    var dateTimeEntree = props.doneesDateTime;
    var date = dateTimeEntree.split('T').join(' ');
    var dateFormatee = date.substring(0, 16);
    return (
        <td>
            {dateFormatee}
        </td>
    )
}

const ListeEvenementsPourUtilisateur = (props) =>{
    console.log(props.ev[0]);
    var evenementsPourUtilisateur = props.ev;
    console.log('Function ListeEvenementsPourUtilisateur :');
    console.log(evenementsPourUtilisateur);
    return (
        <tbody>
            {evenementsPourUtilisateur.map((e, index) => {
                return <Evenement 
                        key={e.id}
                        num={index+1}
                        description={e.description}
                        emplacement={e.emplacement}
                        dateDebut={e.dateDebut}
                        dateFin={e.dateFin}
                    />
            })}
        </tbody>
        
    )
}

const Evenement = (props) =>{
    console.log('Evenement :');
    console.log(props);
    return(
        <tr>            
            <td>{props.num}</td>
            <td>{props.description}</td>
            <td>{props.emplacement}</td>
            <FormatDateTime doneesDateTime={props.dateDebut} />
            <CalculerDuree dateACalculer={[props.dateDebut, props.dateFin]} />
            <td>Présence sera ici</td>
            <td>
                <Button variant='success' size="sm" className="me-2" title="Est présent"> <BiCheck /></Button>
                <Button variant='warning' size="sm" className="me-2" title="Est absent"> <BiX /></Button>
            </td>
            <td>{props.id}</td>
        </tr>
    )
}

{/* <tr key={e.id}>
                        {<td>{index + 1}</td>
                        <td>{e.description}</td>
                        <FormatDateTime doneesDateTime={e.dateDebut} />
                        <CalculerDuree dateACalculer={[e.dateDebut, e.dateFin]} />
                        <td>Présence sera ici</td>
                        {/*convertirPresence(e.estPresentAevenement)}
                        <td><Button variant='success' size="sm" className="me-2" title="Est présent"> <BiCheck /></Button>
                            <Button variant='warning' size="sm" className="me-2" title="Est absent"> <BiX /></Button>
                        </td>}
                    </tr> */}

export const PageAcceuilEntraineur = () => {
    const [utilisateur, setUtilisateur] = useState({});
    const [idUtilisateur, setIdUtilisateur] = useState('');
    const [roleUtilisateur, setRoleUtilisateur] = useState('');

    const [equipes, setEquipes] = useState([]);
    const [evenements, setEvenements] = useState([]);
    const [utilisateurEvenement, setUtilisateurEvenement] = useState([]);
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
        trouverEvenementsPourUtilisateur();
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
            setUtilisateur(result);
            setRoleUtilisateur(result.roles);
            setIdUtilisateur(result.idUtilisateur);
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

    async function trouverEvenementsPourUtilisateur(){
        await evenements.flatMap((ev) => obtenirEvenementAPartirSonId(ev.fk_Id_Evenement));
        // console.log('ev :');
        // console.log(ev);
    }

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
                // setUtilisateurEvenement(arrayEvenements);
        }).catch(function (error) {
            console.log(error);
        });
        setUtilisateurEvenement(arrayEvenements);
    }

    function MouseOver(event) {
        event.target.style.background = 'grey';
    }
    function MouseOut(event){
        event.target.style.background="";
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
                    <tbody>
                        {equipes.map((e, index) => (
                            <tr key={e.idEquipe} onClick={() => navigate(`/uneEquipe/${e.idEquipe}`)} style={{cursor: "pointer"}} onMouseOver={MouseOver} onMouseOut={MouseOut}>
                                <td>{index + 1}</td>
                                <td>{e.nom}</td>
                                <td>{e.region}</td>
                                <td>{e.sport}</td>
                                <td>{e.associationSportive}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
            <Row style={{marginTop: "1.5em"}}>
                <Col>
                    <h5>Vos événements à venir</h5>
                </Col>
            </Row>
            <Row>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom événement</th>
                            <th>Emplacement</th>
                            <th>Date début</th>
                            <th>Durée</th>
                            <th>Presence</th>
                            <th></th>
                        </tr>
                    </thead>
                    
                        <ListeEvenementsPourUtilisateur ev={utilisateurEvenement} />
                        {/*Array.isArray(utilisateurEvenement) ? utilisateurEvenement.map((e, index) => (
                            <tr key={e.id}>
                                <td>{index + 1}</td>
                                <td>{e.description}</td>
                                <FormatDateTime doneesDateTime={e.dateDebut} />
                                <CalculerDuree dateACalculer={[e.dateDebut, e.dateFin]} />
                                <td>Présence sera ici</td>
                                {/*convertirPresence(e.estPresentAevenement)}
                                <td><Button variant='success' size="sm" className="me-2" title="Est présent"> <BiCheck /></Button>
                                    <Button variant='warning' size="sm" className="me-2" title="Est absent"> <BiX /></Button>
                                </td>
                            </tr>
                        )) : [] */}
                    
                </Table>
            </Row>
        </Container>
        </>
    )
}