import { React, useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";

export const PageModifieUnEvenement = () => {
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

    function verifierDonnees(){
        console.log('Ici validera les données du formulaire et les soumettra au serveur ');
    }

    return(
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <h2>Modification des données d'événement</h2>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm={8}>
                        <Form className="p-4 p-md-5 border rounded-3 bg-light">
                            <Form.Group className="mb-3">
                                <Form.Label>Nom de l'événement</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="description" 
                                    
                                    defaultValue={description} 
                                    onChange={(event) => setDescription(event.target.value)} />
                                    
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Emplacement</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="emplacement" 
                                    
                                    defaultValue={emplacement} 
                                    onChange={(event) => setEmplacement(event.target.value)} />
                                    
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Date de début</Form.Label>
                                <Form.Control 
                                    type="datetime-local" 
                                    name="dateDebut" 
                                    
                                    defaultValue={dateDebut} 
                                    onChange={(event) => setDateDebut(event.target.value)} />
                                    
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Date de fin</Form.Label>
                                <Form.Control 
                                    type="datetime-local" 
                                    name="dateFin" 
                                    
                                    defaultValue={dateFin} 
                                    onChange={(event) => setDateFin(event.target.value)} />
                                    
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Type événement</Form.Label>
                                <Form.Select 
                                    name="typeEvenement"
                                    defaultValue={typeEvenement}
                                    
                                    onChange={(event) => setTypeEvenement(event.target.value)}  >
                                        <option value="">Choisir une option</option>
                                        <option value="1">Entrainement</option>
                                        <option value="2">Partie</option>
                                        <option value="3">Autre</option>
                                </Form.Select>
                                    
                            </Form.Group>

                            <Button  className="me-4" variant='primary' onClick={verifierDonnees}>Changer les données</Button>
                            <Link to={'/evenements'}>
                                <Button  className="me-2" variant='danger'>Annuler</Button>
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}