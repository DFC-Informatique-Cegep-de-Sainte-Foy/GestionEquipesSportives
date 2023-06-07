import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth0 } from '@auth0/auth0-react';

const DisplayingErrorMessagesSchema = Yup.object().shape({
    nomUtilisateur: Yup.string()
        .min(2, 'Trop court!')
        .max(100, 'Trop long!')
        .required('Ce champ est obligatoire!'),
    prenomUtilisateur: Yup.string()
        .min(2, 'Trop court!')
        .max(30, 'Trop long!')
        .required('Ce champ est obligatoire!'),
    dateNaissance: Yup.string()
        .required('Ce champ est obligatoire!')
});

export const FormulaireValidationInscription = () => {
    const today = new Date().toISOString().split('T')[0];
    const [reponse, setReponse] = useState('');
    const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    const [userEstDansLaBD, setUserEstDansLaBD] = useState(false);

    async function getUtilisateur() {
        if (isAuthenticated) {
            const token = await getAccessTokenSilently();

            await fetch(`api/utilisateur/${user.name}`, {
                headers: {
                    Accept: "application/json", Authorization: `Bearer ${token}`
                },
            }).then(response => {
                if (response.status === 404) {
                    setUserEstDansLaBD(false);
                } else if (response.ok) {
                    return response.json();
                }
            }).then(data => {
                if (data) {
                    setUserEstDansLaBD(true);
                }
            }).catch(err => {
                console.error(err);
                setUserEstDansLaBD(false);
            });
        } else {
            setUserEstDansLaBD(false);
        }
    }



    useEffect(() => {
        getUtilisateur();
    }, [userEstDansLaBD, isAuthenticated]);



    async function soumettreFormulaire(values) {
        const token = await getAccessTokenSilently();

        await fetch('api/utilisateur', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                dateNaissance: values.dateNaissance,
                Nom: values.nomUtilisateur,
                Prenom: values.prenomUtilisateur,
                NumTelephone: values.numeroTelephone,
                Email: values.courriel
            })
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(data => {            
            if (data) {
                console.log(data);
                window.location.reload(); // Reload the page
            }
        }).catch(err => {
            console.error(err);
        });
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
                            courriel: `${user.email}`
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
                                <h5>Vous devez entrer certaines informations avant de vous connecter</h5>
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
                                    {/* <div className="col-6 p-3">
                                    <Button variant="secondary" onClick={() => (window.location.href = window.location.origin)} className="float-end">Retour</Button>
                                    </div> */}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}
