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
    const [formValidation, setFormValidation] = useState(true);
    const [erreurDescription, setErreurDescription] = useState('');
    const [erreurTypeEvenement, setErreurTypeEvenement] = useState('');

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
    
    useEffect(() => {
        getEvenement(id);
    }, [evenement.id]);

    function verifierDonnees(){
        console.log('Ici validera les données du formulaire ');

        if(!description){
            setFormValidation(false);
            setErreurDescription('Veillez entrez un description')
        }else{
            setErreurDescription('');
        }

        if(!erreurTypeEvenement){
            setFormValidation(false);
            setErreurTypeEvenement('Veillez entrez un type d\'événement');
        }else{
            setErreurTypeEvenement('');            
        }

        if(erreurTypeEvenement && erreurDescription){
            setFormValidation(true);
        }
    }

    function soumettreFormulaire(){
        verifierDonnees();
            if(!formValidation){
                // PUT request fetch
                const requestOptions = {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        id: id,
                        description: description,
                        emplacement: emplacement,
                        dateDebut: dateDebut,
                        dateFin: dateFin,
                        typeEvenement: typeEvenement
                    })
                };
                fetch(`api/evenements/${id}`, requestOptions)
                    .then(response => response.json())
                    .catch(function (error) {
                        console.log(error)
                    });
            }
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
                                    className={erreurDescription ? "is-invalid form-control" : "form-control"}
                                    defaultValue={description} 
                                    onChange={(event) => setDescription(event.target.value)} />
                                    {erreurDescription && <p style={{color: "red"}}>{erreurDescription}</p>}
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
                                    className={erreurTypeEvenement ? "is-invalid form-control" : "form-control"}
                                    onChange={(event) => setTypeEvenement(event.target.value)}  >
                                        <option value="">Choisir une option</option>
                                        <option value="1">Entrainement</option>
                                        <option value="2">Partie</option>
                                        <option value="3">Autre</option>
                                </Form.Select>
                                    {erreurTypeEvenement && <p style={{color: "red"}}>{erreurTypeEvenement}</p>}
                            </Form.Group>

                            <Button  className="me-4" variant='primary' onClick={soumettreFormulaire}>Changer les données</Button>
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