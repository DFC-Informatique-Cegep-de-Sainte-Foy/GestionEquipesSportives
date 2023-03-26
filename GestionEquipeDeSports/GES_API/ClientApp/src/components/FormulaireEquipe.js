import { React, useState } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

export const FormEquipe = () => {
    const [nomEquipe, setNomEquipe] = useState('');
    const [region, setRegion] = useState('');
    const [sport, setSport] = useState('');
    const [associationSportive, setAssociationSportive] = useState('');
    const [nomEquipeErreur, setNomEquipeErreur] = useState('');
    const [regionErreur, setRegionErreur] = useState('');
    const [sportErreur, setSportErreur] = useState('');
    const [associationSportiveErreur, setAssociationSportiveErreur] = useState('');
    const [formValidation, setFormValidation] = useState(true);

    function verifierDonnees(){
        if(!nomEquipe){
            setFormValidation(false);
            setNomEquipeErreur('Veillez entrez un nom');
        }else{
            setNomEquipeErreur('');
        }

        if(!region){
            setFormValidation(false);
            setRegionErreur('Veillez entrez un nregion');
        }else{
            setRegionErreur('');
        }

        if(!sport){
            setFormValidation(false);
            setSportErreur('Veillez entrez un sport');
        }else{
            setSportErreur('');
        }

        if(!associationSportive){
            setFormValidation(false);
            setAssociationSportiveErreur('Veillez entrez un nregion');
        }else{
            setAssociationSportiveErreur('');
        }

        if(nomEquipeErreur && regionErreur && sportErreur && associationSportiveErreur){
            setFormValidation(true);
        }
    }

    function soumettreFormulaire(){
        verifierDonnees();
        if(!formValidation){
            //POST request fetch
            // const requestOptions = {
            //     method: 'POST',
            //     headers: { 
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ 
            //         Nom: nomEquipe,
            //         Region: region,
            //         Sport: sport,
            //         AssociationSportive: associationSportive
            //     })
            // };

        }
    }

    return(
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <h2>Ajouter une équipe</h2>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm={8}>
                        <Form className="p-4 p-md-5 border rounded-3 bg-light">
                            <Form.Group className="mb-3">
                                <Form.Label>Nom équipe</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="nom_equipe" 
                                    className={nomEquipeErreur ? "is-invalid form-control" : "form-control"}
                                    defaultValue={nomEquipe} 
                                    onChange={(event) => setNomEquipe(event.target.value)} />
                                {nomEquipeErreur && <div style={{color: "red"}}>{nomEquipeErreur}</div>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Region</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="region" 
                                    defaultValue={region}
                                    className={regionErreur ? "is-invalid form-control" : "form-control"}
                                    onChange={(event) => setRegion(event.target.value)} />
                                {regionErreur && <div style={{color: "red"}}>{regionErreur}</div>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Sport</Form.Label>
                                <Form.Select 
                                    name="nom_sport" 
                                    defaultValue={sport}
                                    className={sportErreur ? "is-invalid form-control" : "form-control"}
                                    onChange={(event) => setSport(event.target.value)} >
                                        <option value="">Choisir une option</option>
                                        <option value="soccer">Soccer</option>
                                        <option value="baseball">Baseball</option>
                                        <option value="football">Football</option>
                                        <option value="natation">Natation</option>
                                </Form.Select>
                                {sportErreur && <div style={{color: "red"}}>{sportErreur}</div>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Association Sportive</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="association_sportive" 
                                    defaultValue={associationSportive}
                                    className={associationSportiveErreur ? "is-invalid form-control" : "form-control"}
                                    onChange={(event) => setAssociationSportive(event.target.value)} />
                                    {associationSportiveErreur && <div style={{color: "red"}}>{associationSportiveErreur}</div>}
                            </Form.Group>

                            <Button className="me-4" variant='primary' onClick={soumettreFormulaire} >Ajouter</Button>
                            <Link to={'/equipes'}>
                                <Button variant="secondary" className="float-end">Retour à la page des équipes</Button>
                            </Link>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

