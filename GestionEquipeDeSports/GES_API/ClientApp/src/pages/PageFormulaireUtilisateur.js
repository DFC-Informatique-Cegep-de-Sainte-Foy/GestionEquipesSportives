import React, { useState } from "react";
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth0 } from '@auth0/auth0-react';

const DisplayingErrorMessagesSchema = Yup.object().shape({
    nomUtilisateur: Yup.string()
        .min(2, 'Trop court!')
        .max(30, 'Trop long!')
        .required('Ce champ est obligatoire!'),
    prenomUtilisateur: Yup.string()
        .min(2, 'Trop court!')
        .max(30, 'Trop long!')
        .required('Ce champ est obligatoire!'),
    courriel: Yup.string()
        .min(3, 'Trop court!')
        .max(30, 'Trop long!')
        .required('Ce champ est obligatoire!'),
    ageUtilisateur: Yup.string()
        .min(0, 'Trop court!')
        .max(2, 'Trop long!')
        .required('Ce champ est obligatoire!'),
});

export const FormUtilisateur = () => {
    const [reponse, setReponse] = useState('');
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const {id} = useParams();
    console.log(id);

    async function soumettreFormulaire(values) {
        const token = await getAccessTokenSilently();

        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                Nom: values.nomUtilisateur,
                Prenom: values.prenomUtilisateur,
                Email: values.courriel,
                Age: values.ageUtilisateur
            })
        };

        const reponse = await fetch('api/utilisateur', requestOptions);
        console.log(reponse);
        const data = await reponse.json();
        console.log(data);

        const optionsRequeteEquipeJoueur = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
                body: JSON.stringify({
                    Fk_Id_Utilisateur: data,
                    FK_Id_Equipe: id
                })
        };
        await fetch('api/equipeJoueur', optionsRequeteEquipeJoueur)
        .then(function (reponse) {
            console.log(reponse);
            if(reponse.ok){
                setReponse('Le joueur a été ajouté avec succès!');
            }
        }).catch(function (error) {
            console.log(error)
        })
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col sm={8}>
                    <Formik
                        initialValues={{
                            nomUtilisateur: '',
                            prenomUtilisateur: '',
                            courriel: '',
                            ageUtilisateur: '',
                        }}
                        validationSchema={DisplayingErrorMessagesSchema}
                            onSubmit={values => {
                            soumettreFormulaire(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="p-4 p-md-5 border rounded-3 bg-light">
                                <Row className="justify-content-md-center">
                                    <Col sm={8}>
                                        <h2>Ajouter un joueur</h2>
                                    </Col>
                                </Row>
                                <label>Nom*</label>
                                <div className="form-group">
                                    <Field name="nomUtilisateur" type="text" className="form-control" />
                                    {touched.nomUtilisateur && errors.nomUtilisateur && <div style={{ color: "red" }}>{errors.nomUtilisateur}</div>}
                                </div>

                                <label>Prénom*</label>
                                <div className="form-group">
                                    <Field name="prenomUtilisateur" type="text" className="form-control" />
                                    {touched.prenomUtilisateur && errors.prenomUtilisateur && <div style={{ color: "red" }}>{errors.prenomUtilisateur}</div>}
                                </div>

                                <label>Age*</label>
                                <div className="form-group">
                                    <Field name="ageUtilisateur" type="text" className="form-control" />
                                    {touched.ageUtilisateur && errors.ageUtilisateur && <div style={{ color: "red" }}>{errors.ageUtilisateur}</div>}
                                </div>

                                <label>Courriel*</label>
                                <div className="form-group">
                                    <Field name="courriel" type="text" className="form-control" />
                                    {touched.courriel && errors.courriel && <div style={{ color: "red" }}>{errors.courriel}</div>}
                                </div>
                                {reponse && <p style={{ color: "green", fontWeight: "bold", marginTop: "1.0em" }}>{reponse}</p>}

                                <div className="row">
                                    <div className="col-6 p-3">
                                        <Button variant='primary' type="submit" >Ajouter</Button>
                                    </div>
                                    <div className="col-6 p-3">
                                        <Button variant="secondary" onClick={() => navigate(-1)} className="float-end">Retour</Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>            
    );
}
