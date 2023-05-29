import { React, useState, useEffect } from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BiTrash } from "react-icons/bi";
import { useAuth0 } from '@auth0/auth0-react';
import { CalculerDuree } from '../components/CalculerDuree';
import EvenementService from '../services/EvenementService.js';

function PageUneEquipePourUnEntraineur() {
    const [equipe, setEquipe] = useState({});
    const [nomEquipe, setNomEquipe] = useState('');

    const [equipeEvenement, setEquipeEvenement] = useState([]);
    const [equipeJoueurs, setEquipeJoueurs] = useState([]);
    const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [estEntraineur, setEstEntraineur] = useState(false);

    const { id } = useParams();

    async function getEquipe(id) {
        const token = await getAccessTokenSilently();

        await fetch(`api/equipe/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                setEquipe(result);
                setNomEquipe(result.nom);
                setLoading(false);
            });
    }

    async function getEvenements(id) {
        const token = await getAccessTokenSilently();

        await fetch(`api/equipeEvenement/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                setEquipeEvenement(result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    async function getJoueurs(id) {
        const token = await getAccessTokenSilently();

        await fetch(`api/equipeJoueur/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                setEquipeJoueurs(result);
            })
            .catch((error) => {
                console.error('Error:', error);
            }
        );
    }

    async function supprimerJoueurDeLEquipe(idJoueurDansListe) {
        const token = await getAccessTokenSilently();
        let estConfirme = window.confirm('Etes-vous sûr que vous voulez supprimer?');

        if (estConfirme) {
            let requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    FK_Id_Utilisateur: idJoueurDansListe,
                    FK_Id_Equipe: id
                })
            };
            await fetch("api/equipeJoueur", requestOptions);

            getJoueurs(id);
        }
    }

    async function supprimerEvenementDeLEquipe(idEvenementDansList) {
        const token = await getAccessTokenSilently();
        let estConfirme = window.confirm('Etes-vous sûr que vous voulez supprimer?');

        if (estConfirme) {
            let requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    FK_Id_Evenement: idEvenementDansList,
                    FK_Id_Equipe: id
                })
            };

            await fetch(`/api/equipeEvenement`, requestOptions);
            getEvenements(id);

            //supprimer de table joueurEvenement
            // equipeJoueurs.forEach(element => {
            //     supprimerDeTableEvenementJoueur(element.idUtilisateur, idEvenementDansList);
            // });
        }
    }

    // async function supprimerDeTableEvenementJoueur(idJoueur, idEvenementList){
    //     const token = await getAccessTokenSilently();
    //     let requestOptionsEvenementJoueur = {
    //         method: 'DELETE',
    //         headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    //         body: JSON.stringify({
    //             FK_Id_Utilisateur: idJoueur,
    //             FK_Id_Evenement: idEvenementList
    //         })
    //     };

    //     await fetch(`/api/evenementJoueur`, requestOptionsEvenementJoueur)
    //     .catch(function (error) {
    //          console.log(error);
    //      });
    // }

    async function getRoleVenantDuBackend(email) {
        const token = await getAccessTokenSilently();

        const resultat = await fetch(`api/UtilisateurEquipeRole/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });

        if (!resultat.ok) {
            throw new Error("pas de role");
        }

        const body = await resultat.json();

        if (body.length === 0) {
            return 0;
        }

        for (let i = 0; i < body.length; i++) {
            if (body[i].fkIdRole === 1 && body[i].fkIdEquipe === id) {
                setEstEntraineur(true);
            }
        }
    }

    function AfficherBoutonAjouterAthlete() {
        if (isAuthenticated === true) {
            if (estEntraineur) {
                return (
                    <Button variant="success" onClick={() => navigate(`/inviterOuAjouterJoueur/${id}`)} className="btn btn-success float-end" >Ajouter un joueur</Button>
                );
            }
        }
    }

    function AfficherBoutonAjouterUnEvenement() {
        if (isAuthenticated === true) {
            if (estEntraineur) {
                return (
                    <>
                        <Button variant="info" onClick={() => navigate(`/ajouterEvenementsCoup/${id}`)}>Ajouter via un fichier CSV</Button>
                        <Button variant="success" onClick={() => navigate(`/formulaireEvenement/${id}`)} className="btn btn-success float-end">Ajouter un événement</Button>
                    </>
                );
            }
        }
    }

    useEffect(() => {
        getEquipe(id);
    }, [equipe.id]);

    useEffect(() => {
        getEvenements(id);
    }, [equipeEvenement.id]);

    useEffect(() => {
        getJoueurs(id);
    }, []);

    useEffect(() => {
        getRoleVenantDuBackend(user.email);
    }, []);

    return (
        <>
            <Container>
                <Row>
                    <h2>Nom de l'équipe: {nomEquipe}</h2>
                    <div>
                        <Button variant='success' onClick={() => navigate(-1)} className="mb-3">Retour à la page d'accueil</Button>
                    </div>
                </Row>
                <p></p>
                <p></p>
                <p></p>
                <Row>
                    <Col>
                        <h5>Liste des joueurs de l'équipe</h5>
                    </Col>

                    <Col>
                        <AfficherBoutonAjouterAthlete />
                    </Col>
                    <p></p>
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
                                {estEntraineur && (
                                    <th></th>
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {equipeJoueurs.map((joueur, index) => (
                                <tr key={joueur.idUtilisateur}>
                                    <td>{index + 1}</td>
                                    <td>{joueur.nom}</td>
                                    <td>{joueur.prenom}</td>
                                    <td>{joueur.email}</td>
                                    <td>{joueur.numTelephone}</td>
                                    {estEntraineur && (
                                        <td>
                                            <Button
                                                variant='danger' onClick={() => supprimerJoueurDeLEquipe(joueur.idUtilisateur)} size="sm" title="Supprimer" ><BiTrash />
                                            </Button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                </Row>

                <Row>
                    <Col>
                        <h5>Liste des événements</h5>
                    </Col>

                    <Col>
                        <AfficherBoutonAjouterUnEvenement />
                    </Col>
                    <p></p>
                </Row>

                <Row>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Description</th>
                                <th>Emplacement</th>
                                <th>Date de début</th>
                                <th>Durée</th>
                                <th>Type événement</th>
                                {estEntraineur && (
                                    <th></th>
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {equipeEvenement.map((e, index) => (
                                <tr key={e.id}>
                                    <td>{index + 1}</td>
                                    <td><Link to={{ pathname: `/unEvenement/${e.id}` }}>{e.description}</Link></td>
                                    <td>{e.emplacement}</td>
                                    <td>{EvenementService.formatDateTime(e.dateDebut)}</td>
                                    <td><CalculerDuree dateACalculer={[e.dateDebut, e.dateFin]} /> </td>
                                    <td>{EvenementService.affichageTypeEvenement(e.typeEvenement)}</td>
                                    {estEntraineur && (
                                        <td>
                                            <Button variant='danger' onClick={() => supprimerEvenementDeLEquipe(e.id)} size="sm" title="Supprimer" ><BiTrash /></Button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    );
}

export default PageUneEquipePourUnEntraineur;