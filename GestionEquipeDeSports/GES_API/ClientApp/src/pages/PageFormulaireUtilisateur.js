import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth0 } from '@auth0/auth0-react';

const DisplayingErrorMessagesSchema = Yup.object().shape({
    nomUtilisateur: Yup.string()
        .min(2, 'Trop court!')
        .max(50, 'Trop long!')
        .required('Ce champ est obligatoire!'),
    prenomUtilisateur: Yup.string()
        .min(2, 'Trop court!')
        .max(50, 'Trop long!')
        .required('Ce champ est obligatoire!'),
    courriel: Yup.string()
        .min(3, 'Trop court!')
        .max(50, 'Trop long!')
        .required('Ce champ est obligatoire!'),
    dateNaissance: Yup.string()
        .required('Ce champ est obligatoire!'),
});

export const FormUtilisateur = () => {
    const today = new Date().toISOString().split('T')[0];
    const [reponse, setReponse] = useState(null);
    const { getAccessTokenSilently, user } = useAuth0();
    const navigate = useNavigate();
    const [idUtilisateur, setIdUtilisateur] = useState('');
    const [userEstDansLaBD, setUserEstDansLaBD] = useState(false);

    const { id } = useParams();

    // async function soumettreFormulaire(values) {
    //     console.log(values);

    //     const token = await getAccessTokenSilently();

    //     await fetch('api/utilisateur', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    //         body: JSON.stringify({
    //             DateNaissance: values.dateNaissance,
    //             Nom: values.nomUtilisateur,
    //             Prenom: values.prenomUtilisateur,
    //             NumTelephone: values.numeroTelephone,
    //             Email: values.courriel
    //         })
    //     }).then(response => {
    //         console.log(response, " reponse de lajout du jouer dans la bd");
    //         if (response.ok) {
    //             return response.json();
    //         }
    //     }).then(data => {
    //         console.log(data, " data de lajout du jouer dans la bd");
    //         if (data) {
    //             setReponse(data);
    //             setIdUtilisateur(data.IdUtilisateur);
    //         }
    //     }).catch(err => {
    //         console.error(err);
    //     });

    //     if (reponse) {
    //         await fetch('api/equipeJoueur', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    //             body: JSON.stringify({
    //                 idEquipe: id,
    //                 idJoueur: idUtilisateur
    //             })
    //         }).then(response => {
    //             if (response.ok) {
    //                 return response.json();
    //             }
    //         }).then(data => {
    //             if (data) {
    //                 setReponse(data);
    //                 setUserEstDansLaBD(true);
    //             }
    //         }).catch(err => {
    //             console.error(err);
    //         });
    //     }
    // }

    async function soumettreFormulaire(values) {
        console.log(values);

        const token = await getAccessTokenSilently();

        try {
            const response = await fetch('api/utilisateur', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    DateNaissance: values.dateNaissance,
                    Nom: values.nomUtilisateur,
                    Prenom: values.prenomUtilisateur,
                    NumTelephone: values.numeroTelephone,
                    Email: values.courriel
                })
            });

            console.log(response, " reponse de lajout du jouer dans la bd");

            if (response.ok) {
                const data = await response.json();
                console.log(data, " data de lajout du jouer dans la bd");

                if (data) {
                    setReponse(data);
                    setIdUtilisateur(data.IdUtilisateur);

                    // Second API call
                    const response2 = await fetch('api/equipeJoueur', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                        body: JSON.stringify({
                            Fk_Id_Equipe: id,
                            Fk_Id_Utilisateur: data.IdUtilisateur // I suppose you want to use the new user's Id here
                        })
                    });

                    if (response2.ok) {
                        const data2 = await response2.json();

                        if (data2) {
                            setReponse(data2);
                            setUserEstDansLaBD(true);
                        }
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <Formik
                        initialValues={{
                            nomUtilisateur: '',
                            prenomUtilisateur: '',
                            dateNaissance: '',
                            numeroTelephone: '',
                            courriel: ''
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
                                        <h2></h2>
                                    </Col>
                                </Row>
                                <h5>Ajouter un nouveau joueur à votre équipe</h5>
                                <label>Nom*</label>
                                <div className="form-group">
                                    <Field name="nomUtilisateur" type="text" className="form-control" />
                                    {touched.nomUtilisateur && errors.nomUtilisateur && <div style={{ color: "red" }}>{errors.nomUtilisateur}</div>}
                                </div>
                                <br></br>
                                <label>Prénom*</label>
                                <div className="form-group">
                                    <Field name="prenomUtilisateur" type="text" className="form-control" />
                                    {touched.prenomUtilisateur && errors.prenomUtilisateur && <div style={{ color: "red" }}>{errors.prenomUtilisateur}</div>}
                                </div>
                                <br></br>
                                <label>Courriel*</label>
                                <div className="form-group">
                                    <Field name="courriel" type="text" className="form-control" />
                                    {touched.courriel && errors.courriel && <div style={{ color: "red" }}>{errors.courriel}</div>}
                                </div>
                                <br></br>
                                <label>Date naissance*</label>
                                <div className="form-group">
                                    <Field name="dateNaissance" type="Date" max={today} className="form-control" />
                                    {touched.dateNaissance && errors.dateNaissance && <div style={{ color: "red" }}>{errors.dateNaissance}</div>}
                                </div>
                                <br></br>
                                <label>Numéro de téléphone*</label>
                                <div className="form-group">
                                    <Field name="numeroTelephone" type="tel" className="form-control" />
                                    {touched.numeroTelephone && errors.numeroTelephone && <div style={{ color: "red" }}>{errors.numeroTelephone}</div>}
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="col-6 p-3">
                                        <Button variant='primary' type="submit">Ajouter</Button>
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
