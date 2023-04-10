import React, { Component } from "react";
import { Button, Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class Utilisateurs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            utilisateurs: []
        };
    }

    async componentDidMount() {
        await fetch("api/utilisateur")
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    utilisateurs: result
                });
            });
    }

    formatTypeUtilisateur(donnees) {
        if (donnees == 0) {
            return 'Admin';
        }
        else if(donnees == 1){
            return 'Entraineur';
        }
        else if(donnees == 2){
            return 'Tuteur';
        }
        else {
            return 'Joueur';
        }
    }

    render() {
        return (
            <Container>
                <h1>Liste des utilisateurs</h1>
                <Link to={'/formulaireEntraineur'}>
                    <Button variant="success" >Ajouter un utilisateur</Button><p></p>
                </Link>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Adresse</th>
                            <th>Numéro de téléphone</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.utilisateurs.map((u, index) => (
                            <tr key={u.idUtilisateur}>
                                <td>{index + 1}</td>
                                <td><Link to={{ pathname: `/pagejoueur/${u.idUtilisateur}`}}>{u.nom}</Link></td>
                                <td>{u.prenom}</td>
                                <td>{u.age}</td>
                                <td>{u.email}</td>
                                <td>{u.adresse}</td>
                                <td>{u.numTelephone}</td>
                                <td>{this.formatTypeUtilisateur(u.roles)}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }
}