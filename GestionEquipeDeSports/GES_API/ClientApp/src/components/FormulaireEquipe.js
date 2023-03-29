import React from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

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

export const FormEquipe = () => {

    async function soumettreFormulaire(values) {
        console.log('formulaire est Valid!');
        //POST request fetch

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Nom: values.nomEquipe,
                Region: values.region,
                Sport: values.sport,
                AssociationSportive: values.associationSportive
            })
        };
        await fetch('api/equipe', requestOptions)
            .then(function (reponse) {
                console.log(reponse);

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
                                console.log(values);
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
                                            <option value="Footbol">Footbol</option>
                                            <option value="Natation">Natation</option>
                                        </Field>
                                        {touched.sport && errors.sport && <div style={{ color: "red" }}>{errors.sport}</div>}
                                    </div>

                                    <label>Association sportive</label>
                                    <div className="form-group">
                                        <Field name="associationSportive" className="form-control" />
                                        {touched.associationSportive && errors.associationSportive && <div style={{ color: "red" }}>{errors.associationSportive}</div>}
                                    </div>

                                    <div className="row">
                                        <div className="col-6 p-3">
                                            <Button variant='primary' type="submit" >Ajouter</Button>
                                        </div>
                                        <div className="col-6 p-3">
                                            <Link to={'/equipes'}>
                                                <Button variant="secondary" className="float-end">Retour à la page des équipes</Button>
                                            </Link>
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

