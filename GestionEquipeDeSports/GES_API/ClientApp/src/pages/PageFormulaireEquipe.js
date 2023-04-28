import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth0 } from '@auth0/auth0-react';

const DisplayingErrorMessagesSchema = Yup.object().shape({
    nomEquipe: Yup.string()
        .min(3, 'Trop court!')
        .max(30, 'Trop long!')
        .required('Ce champ est obligatoire!'),
    region: Yup.string()
        .min(3, 'Trop court!')
        .max(30, 'Trop long!')
        .required('Ce champ est obligatoire!'),
    sport: Yup.string()
        .min(3, 'Trop court!')
        .max(30, 'Trop long!')
        .required('Ce champ est obligatoire!'),
    associationSportive: Yup.string()
        .min(4, 'Trop court!')
        .max(30, 'Trop long!')
        .required('Ce champ est obligatoire!'),
});

export const PageFormEquipe = () => {
    const[idUtilisateur, setIdUtilisateur] = useState('');
    const[reponse ,setReponse] = useState('');
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const { user } = useAuth0();

    useEffect(() => {
        getUtilisateur(user.email);
    }, []);

    async function getUtilisateur(email) {
        const token = await getAccessTokenSilently();
        console.log(email);
        await fetch(`api/utilisateur/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            setIdUtilisateur(result.idUtilisateur);
            console.log(result);
        }).catch(function (error) {
            console.log(error);
        });
    }

    async function soumettreFormulaire(values) {
        const token = await getAccessTokenSilently();
        // console.log("ACCESS TOKEN: " + token);

        //POST request fetch dans table equipe
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                Nom: values.nomEquipe,
                Region: values.region,
                Sport: values.sport,
                AssociationSportive: values.associationSportive
            })
        };
        const reponse = await fetch('api/equipe', requestOptions);
        console.log(reponse);
        const data = await reponse.json();
        console.log(data);

        // POST request fetch dans table equipeJoueur
        let requestOptionsEquipeJoueur = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                Fk_Id_Utilisateur: idUtilisateur,
                Fk_Id_Equipe: data
            })
        };
        await fetch('api/equipeJoueur', requestOptionsEquipeJoueur)
            .then(function (reponse) {
                console.log(reponse);
                if(reponse.ok){
                    setReponse('Vous avez ajouté une équipe');
                }
            }).catch(function (error) {
                console.log(error)
            })
    }

    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={8}>
                        <Formik
                            initialValues={{
                                nomEquipe: '',
                                region: '',
                                sport: '',
                                associationSportive: '',
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
                                            <h2>Ajouter une équipe</h2>
                                        </Col>
                                    </Row>
                                    <label>Nom de l'équipe</label>
                                    <div className="form-group">
                                        <Field name="nomEquipe" type="text" className="form-control" />
                                        {touched.nomEquipe && errors.nomEquipe && <div style={{ color: "red" }}>{errors.nomEquipe}</div>}
                                    </div>

                                    <label>Region</label>
                                    <div className="form-group">
                                        <Field name="region" className="form-control" />
                                        {touched.region && errors.region && <div style={{ color: "red" }}>{errors.region}</div>}
                                    </div>

                                    <label>Sport</label>
                                    <div className="form-group">
                                        <Field as="select" name="sport" className="form-control">
                                            <option value="">Choisir un sport</option>
                                            <option value="Soccer">Soccer</option>
                                            <option value="Hockey">Hockey</option>
                                            <option value="Footbol">Football</option>
                                            <option value="Natation">Natation</option>
                                        </Field>
                                        {touched.sport && errors.sport && <div style={{ color: "red" }}>{errors.sport}</div>}
                                    </div>

                                    <label>Association sportive</label>
                                    <div className="form-group">
                                        <Field name="associationSportive" className="form-control" />
                                        {touched.associationSportive && errors.associationSportive && <div style={{ color: "red" }}>{errors.associationSportive}</div>}
                                    </div>
                                    {reponse && <p style={{ color: "red" }}>{reponse}</p>}
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
        </>
    );
}

