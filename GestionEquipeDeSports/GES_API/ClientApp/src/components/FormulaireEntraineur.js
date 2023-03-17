import React, { Component } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class FormEntraineur extends Component{
    constructor(props){
        super(props);
        this.state = {
            nom_entraineur: '',
            prenom_entraineur: '',
            age_entraineur: '',
            email: '',
            telephone: '',
            formValide: false,
            estErreur: {}
        }

        this.handleInputChangee = this.handleInputChangee.bind(this);
        this.ajouterEntraineur = this.ajouterEntraineur.bind(this);
    };

    handleInputChangee(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    ajouterEntraineur(e){
        e.preventDefault();
        console.log(this.state.nom_entraineur);
        console.log(this.state.prenom_entraineur);
        console.log(this.state.age_entraineur);
        console.log(this.state.email);
        console.log(this.telephone);
        console.log('ajout un entraineur');
        this.setState({
            nom_entraineur: '',
            prenom_entraineur: '',
            age_entraineur: '',
            email: '',
            telephone: ''
        })
    }

    render(){
        return(
            <div>
                <h2>Créer un entraineur</h2>                
                <Form onSubmit={this.ajouterEntraineur}>
                    <Row className="mb-3">
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                name="nom_entraineur"
                                value={this.state.nom_entraineur} 
                                onChange={this.handleInputChangee} />                            
                        </Form.Group>
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                                type="text"
                                name="prenom_entraineur"
                                value={this.state.prenom_entraineur}
                                onChange={this.handleInputChangee} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                name="age_entraineur"
                                min="5"
                                max="100"
                                step="1"
                                value={this.state.age_entraineur}
                                onChange={this.handleInputChangee} />
                        </Form.Group>
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>Courriel</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInputChangee} />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control
                            type="text"
                            name="telephone"
                            value={this.state.telephone}
                            onChange={this.handleInputChangee} />
                    </Form.Group>

                    <Button variant="success" className="mb-3" type="submit">Ajouter</Button>
                    <Link to={'/entraineurs'}>
                        <Button variant="secondary" className="float-end">Retour à la page des entraîneurs</Button>
                    </Link>
                </Form>
            </div>
        );
    }
}