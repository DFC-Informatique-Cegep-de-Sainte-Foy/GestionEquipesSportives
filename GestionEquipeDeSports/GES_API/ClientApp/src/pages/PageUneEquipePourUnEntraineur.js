import { React, useState, useEffect } from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { BiTrash } from "react-icons/bi";
import { useAuth0 } from '@auth0/auth0-react';

function PageUneEquipePourUnEntraineur(){
    const [equipe, setEquipe] = useState({});
    const [nomEquipe, setNomEquipe] = useState('');

    const [equipeEvenement, setEquipeEvenement] = useState([]);
    const [equipeJoueurs, setEquipeJoueurs] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const [loading, setLoading] = useState(true);

    const {id} = useParams();

    async function getEquipe(id){
        const token =  await getAccessTokenSilently();

        await fetch(`api/equipe/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            setEquipe(result);
            setNomEquipe(result.nom);
            setLoading(false);
        });
    }

    useEffect(() => {
        getEquipe(id);
    }, [equipe.id]);


    async function getEvenements(id){
        const token =  await getAccessTokenSilently();

        await fetch(`api/equipeEvenement/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            setEquipeEvenement(result);
        });
    }

    useEffect(() => {
        getEvenements(id);
    }, [equipeEvenement.id]);

    async function getJoueurs(id){
        const token =  await getAccessTokenSilently();

        console.log('On va recevoir une liste des joueurs!');
        await fetch(`api/equipeJoueur/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            setEquipeJoueurs(result);
            console.log(equipeJoueurs);
        });
    }


    return(
        <>
            <Container>
                <Row>
                    <h2>Nom de l'équipe: {nomEquipe}</h2>
                </Row>
                <p></p>
                <p></p>
                <p></p>
                <Row>
                    <Col>

                        <Row>
                            <Col>
                                <h5>Liste des joueurs de l'équipe</h5>
                            </Col>
                            <Col>
                                <Link to={'/formulaireEvenement'}>
                                    <Button variant="success" className="btn btn-success float-end" >Ajouter un joueur</Button><p></p>
                                </Link>
                            </Col>
                        </Row>
                        <p></p>
                        <Row>
                            <Table striped bordered>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nom</th>
                                        <th>Prenom</th>
                                        <th>Email</th>
                                        <th>Téléphone</th>
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
                                            <Button variant='danger' /*onClick={() => supprimerJoueurFromEquipe(j.idUtilisateur)}*/ size="sm" title="Supprimer" ><BiTrash /></Button>
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
    );
}

export default PageUneEquipePourUnEntraineur;