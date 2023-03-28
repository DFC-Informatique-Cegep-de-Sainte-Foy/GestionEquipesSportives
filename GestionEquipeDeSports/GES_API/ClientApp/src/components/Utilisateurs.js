import React, {Component} from "react";
import { Button, Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class Utilisateurs extends Component{
    constructor(props){
        super(props);
        this.state = {
          utilisateurs: []
        };
    }

    componentDidMount() {
        fetch("api/utilisateur")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    utilisateurs: result
                });
            });
    }

    formatTypeUtilisateur(donnees){
        if(donnees){
            return 'X';
        }
    }

    render(){
        return(
            <Container>
                <h1>Liste des utilisateurs</h1>
                <Link to={'/formulaireEntraineur'}>
                    <Button variant="success" >Ajouter un utilisateur</Button>
                </Link>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Email</th>
                            <th>Adresse</th>
                            <th>Numéro de téléphone</th>
                            <th>Joueur</th>
                            <th>Tuteur</th>
                            <th>Entraineur</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.utilisateurs.map((u, index) => (
                            <tr key={u.idUtilisateur}>
                                <td>{index+1}</td>
                                <td>{u.nom}</td>
                                <td>{u.prenom}</td>
                                <td>{u.email}</td>
                                <td>{u.adresse}</td>
                                <td>{u.numTelephone}</td>
                                <td>{this.formatTypeUtilisateur(u.estJoueur)}</td>
                                <td>{this.formatTypeUtilisateur(u.estTuteur)}</td>
                                <td>{this.formatTypeUtilisateur(u.estEntraineur)}</td>
                                <td>{this.formatTypeUtilisateur(u.estAdmin)}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }
}