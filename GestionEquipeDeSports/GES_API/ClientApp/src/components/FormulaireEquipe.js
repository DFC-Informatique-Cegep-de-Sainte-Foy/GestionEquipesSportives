import React from "react";
import {Form, Button, Alert} from 'react-bootstrap';
import { Link } from "react-router-dom";

export class FormEquipe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nom_sport: '',
            nom_equipe: '',
            region: '',
            association_sportive: '',
            formValide: false,
            estErreur: {}
        }

        this.handleInputChangee = this.handleInputChangee.bind(this);
        this.ajouterEquipe = this.ajouterEquipe.bind(this);
        this.initialState = this.state;
    };

    handleInputChangee(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        // this.validationFormulaire();
    }

    ajouterEquipe(e){
        e.preventDefault();
        if(this.validationFormulaire()){
            //alert('La validation a réussi');
            console.log(this.state.nom_sport);
            console.log(this.state.nom_equipe);
            console.log(this.state.region);
            console.log(this.state.association_sportive);
            console.log('validation a reussi');
            this.setState({
                nom_sport: '',
                nom_equipe: '',
                region: '',
                association_sportive: ''
            });
        }else{
            console.log('erreur validation formulaire!');
        }
    }

    validationFormulaire(){
        const {nom_sport, nom_equipe, region} = this.state;
        let erreurFormulaire = {};
        let formulaireEstValide = true;

        if(!nom_sport){
            formulaireEstValide = false;
            erreurFormulaire["sportErreur"] = "Veuillez sélectionner un sport";
        }

        if(!nom_equipe){
            formulaireEstValide = false;
            erreurFormulaire["nomEquipeErreur"] = "Veillez entrer un nom";
        }

        if(!region){
            formulaireEstValide = false;
            erreurFormulaire["nomRegionErreur"] = "Veillez entrer un region";
        }

        this.setState({estErreur: erreurFormulaire});
        return formulaireEstValide;
    }

    render(){
        const{sportErreur, nomEquipeErreur, nomRegionErreur} = this.state.estErreur;
        return(
            <>
                <div>
                <h2>Ajouter une équipe</h2>
                <Form onSubmit={this.ajouterEquipe}>
                    {this.state.erreur && <Alert variant="danger">{this.state.error}</Alert>}
                    <Form.Group className="mb-3">
                        <Form.Label>Sport</Form.Label>
                        <Form.Select 
                            name="nom_sport" 
                            value={this.state.nom_sport} 
                            className={sportErreur ? "is-invalid form-control" : "form-control"}
                            onChange={this.handleInputChangee} >
                                <option value="">Choisir une option</option>
                                <option value="soccer">Soccer</option>
                                <option value="baseball">Baseball</option>
                                <option value="football">Football</option>
                                <option value="natation">Natation</option>
                        </Form.Select>
                        {sportErreur && <div style={{color: "red"}}>{sportErreur}</div>}
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Nom Equipe</Form.Label>
                        <Form.Control 
                            type="text" name="nom_equipe" 
                            className={nomEquipeErreur ? "is-invalid form-control" : "form-control"}
                            value={this.state.nom_equipe} 
                            onChange={this.handleInputChangee} />
                            {nomEquipeErreur && <div style={{color: "red"}}>{nomEquipeErreur}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Region</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="region" 
                            value={this.state.region} 
                            className={nomRegionErreur ? "is-invalid form-control" : "form-control"}
                            onChange={this.handleInputChangee} />
                            {nomRegionErreur && <div style={{color: "red"}}>{nomRegionErreur}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Association Sportive</Form.Label>
                        <Form.Control type="text" name="association_sportive" value={this.state.association_sportive} onChange={this.handleInputChangee} />
                    </Form.Group>                    
                    
                    <Button variant="success" className="mb-3" type="submit" >Ajouter</Button>
                    <Link to={'/equipes'}>
                        <Button variant="secondary" className="float-end">Retour à la page des équipes</Button>
                    </Link>
                </Form>
                </div>
            </>
        );
    }
}