import React from "react";
import {Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export class FormEvenement extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nom_sport: '',
            nom_evenement: '',
            emplacement: '',
            date_debut: '',
            date_fin: '',
            form_valide: false,
            estErreur: {}
        }

        this.handleInputChangee = this.handleInputChangee.bind(this);
        this.ajouterEvenement = this.ajouterEvenement.bind(this);
        this.initialState = this.state;
    };

    handleInputChangee(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    ajouterEvenement(e){
        e.preventDefault();
        if(this.validationFormulaire()){
            let evenement = {
                description: this.state.nom_evenement,
                emplacement: this.state.emplacement,
                dateDebut: this.state.date_debut,
                dateFin: this.state.date_fin
            };
            console.log(evenement);
            console.log('validation a reussi');
            this.setState({
                nom_sport: '',
                nom_evenement: '',
                emplacement: '',
                date_debut: '',
                date_fin: ''
            });
        }else{
            console.log('erreur validation formulaire');
        }
    }

    validationFormulaire(){
        const {nom_sport, nom_evenement, emplacement, date_debut, date_fin} = this.state;
        let erreurFormulaire = {};
        let formulaireEstValide = true;

        if(!nom_sport){
            formulaireEstValide = false;
            erreurFormulaire["nomSportErreur"] = "Veillez choisir un sport";
        }

        if(!nom_evenement){
            formulaireEstValide = false;
            erreurFormulaire["nomEvenementErreur"] = "Veillez entrer un nom d'evenement";
        }

        if(!emplacement){
            formulaireEstValide = false;
            erreurFormulaire["emplacementErreur"] = "Veillez entrer un emplacement";
        } else if(emplacement.length < 2){
            formulaireEstValide = false;
            erreurFormulaire["emplacementErreur"] = "Veuillez entrer plus de 2 caractères";
        }

        if(!date_debut){
            formulaireEstValide = false;
            erreurFormulaire["dateDebutErreur"] = "veillez entrer une date de début";
        }

        if(!date_fin){
            formulaireEstValide = false;
            erreurFormulaire["dateFinErreur"] = "Veillez entrer une date de fin";
        }

        this.setState({estErreur: erreurFormulaire});
        return formulaireEstValide;
    }

    render(){
        const{nomSportErreur, nomEvenementErreur, emplacementErreur, dateDebutErreur, dateFinErreur} = this.state.estErreur;
        return(
            <>
                <h2>Ajouter un evenement</h2>
                <Form onSubmit={this.ajouterEvenement}>
                    <Form.Group className="mb-3">
                        <Form.Label>Sport</Form.Label>
                        <Form.Select 
                            name="nom_sport"
                            value={this.state.nom_sport}
                            className={nomSportErreur ? "is-invalid form-control" : "form-control"}
                            onChange={this.handleInputChangee}  >
                                <option value="">Choisir une option</option>
                                <option value="soccer">Soccer</option>
                                <option value="baseball">Baseball</option>
                                <option value="football">Football</option>
                                <option value="natation">Natation</option>
                        </Form.Select>
                        {nomSportErreur && <div style={{color: "red"}}>{nomSportErreur}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nom Evenement</Form.Label>
                        <Form.Control 
                            type="text"
                            name="nom_evenement"
                            value={this.state.nom_evenement}
                            className={nomEvenementErreur ? "is-invalid form-control" : "form-control"}
                            onChange={this.handleInputChangee}  />
                            {nomEvenementErreur && <div style={{color: "red"}}>{nomEvenementErreur}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Emplacement</Form.Label>
                        <Form.Control 
                            type="text"
                            name="emplacement"
                            value={this.state.emplacement}
                            className={emplacementErreur ? "is-invalid form-control" : "form-control"}
                            onChange={this.handleInputChangee}  />
                            {emplacementErreur && <div style={{color: "red"}}>{emplacementErreur}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Date de début</Form.Label>
                        <Form.Control 
                            type="datetime-local"
                            name="date_debut"
                            value={this.state.date_debut}
                            className={dateDebutErreur ? "is-invalid form-control" : "form-control"}
                            onChange={this.handleInputChangee}  />
                            {dateDebutErreur && <div style={{color: "red"}}>{dateDebutErreur}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Date de fin</Form.Label>
                        <Form.Control 
                            type="datetime-local"
                            name="date_fin"
                            value={this.state.date_fin}
                            className={dateFinErreur ? "is-invalid form-control" : "form-control"}
                            onChange={this.handleInputChangee}  />
                            {dateFinErreur && <div style={{color: "red"}}>{dateFinErreur}</div>}
                    </Form.Group>
                    
                    <Button variant="success" className="mb-3" type="submit">Ajouter</Button>
                    <Link to={'/evenements'}>
                        <Button variant="secondary" className="float-end">Retour à la liste des événements</Button>
                    </Link>
                </Form>
            </>
        );
    }
}