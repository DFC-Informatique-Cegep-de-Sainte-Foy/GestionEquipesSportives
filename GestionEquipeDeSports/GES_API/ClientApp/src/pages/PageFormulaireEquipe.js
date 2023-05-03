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
    const [utilisateur, setUtilisateur] = useState({});
    const [reponse, setReponse] = useState('');
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const { user } = useAuth0();

    async function getUtilisateur() {
        const token = await getAccessTokenSilently();

        await fetch(`api/utilisateur/${user.name}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                setUtilisateur(result);
                console.log(result);
            }).catch(function (error) {
                console.log(error);
            });
    }

    async function soumettreFormulaire(values) {
        const token = await getAccessTokenSilently();
        // console.log("ACCESS TOKEN: " + token);

        //POST request fetch dans table equipe
        let requestOptionsPost = {
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

        console.log(utilisateur)

        await fetch(`api/equipe?idUser=${utilisateur.idUtilisateur}`, requestOptionsPost)
        .then((result) => {
            console.log(result);
            if(result.ok){
                setReponse('Vous avez ajouté une équipe');
            }
        }).catch(function (error) {
            console.log(error);
        });        
        // const data = await reponse.json();
        // console.log(data);
    }

    useEffect(() => {
        getUtilisateur();
    }, []);

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
                                            <option value="Football">Football</option>
                                            <option value="Natation">Natation</option>
                                            <option value="Baseball">Baseball</option>
                                        </Field>
                                        {touched.sport && errors.sport && <div style={{ color: "red" }}>{errors.sport}</div>}
                                    </div>

                                    <label>Association sportive</label>
                                    <div className="form-group">
                                        <Field name="associationSportive" className="form-control" />
                                        {touched.associationSportive && errors.associationSportive && <div style={{ color: "red" }}>{errors.associationSportive}</div>}
                                    </div>
                                    {reponse && <p style={{ color: "red", fontWeight: "bold", marginTop: "1.0em" }}>{reponse}</p>}
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




