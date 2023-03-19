import React from "react";
import { Button, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import { BiTrash, BiEdit } from "react-icons/bi";

export class Evenements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            evenements: []
        };
        
    }

    componentDidMount(){
        fetch("api/evenements")
        .then(res => res.json())
        .then((result) => {
            this.setState({
                evenements: result
            });
        });
    }
    
    formatDateTime(donnees){
        var dateTimeEntree = donnees;
        var date = dateTimeEntree.split('T')[0];
        var time = dateTimeEntree.split('T')[1].split(':');
        var dateTimeSortie = date + ' ' + time[0] + ':' + time[1];
        return dateTimeSortie;
    }

    render() {
        return (
            <div>
                <h1>Bienvenue dans la page des événements</h1>
                <Link to={'/formulaireEvenement'}>
                    <Button variant="success" className="btn btn-success" >Ajouter un événement</Button><p></p>
                </Link>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Evenement</th>
                            <th>Emplacement</th>
                            <th>Date début</th>
                            <th>Date fin</th>
                            <th>Date creation</th>
                            <th>Date modification</th>
                            <th>Type evenement</th>
                            <th>Etat</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.evenements.map(ev => (
                                    <tr key={ev.id}>
                                        <td>{ev.id}</td>
                                        <td>{ev.description}</td>
                                        <td>{ev.emplacement}</td>
                                        <td>{this.formatDateTime(ev.dateDebut)}</td>
                                        <td>{this.formatDateTime(ev.dateFin)}</td>
                                        <td>{this.formatDateTime(ev.dateCreation)}</td>
                                        <td>{this.formatDateTime(ev.dateModification)}</td>
                                        <td>{ev.typeEvenement}</td>
                                        <td>{ev.etat}</td>
                                        <td>
                                            <Link >
                                                <Button variant='warning' size="sm" className="me-2" title="Modifier"> <BiEdit /> </Button>
                                            </Link>
                                            <Link >
                                                <Button variant='danger' size="sm" title="Supprimer"> <BiTrash /> </Button>
                                            </Link>
                                        </td>
                                    </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}