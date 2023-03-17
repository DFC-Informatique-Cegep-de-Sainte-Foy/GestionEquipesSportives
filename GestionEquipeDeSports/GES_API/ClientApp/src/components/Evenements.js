import React from "react";
import { Button, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom';

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

    render() {
        return (
            <div>
                <h1>Bienvenue dans la page des évenements</h1>
                <Link to={'/formulaireEvenement'}>
                    <Button variant="success" className="btn btn-success" >Ajouter un évenement</Button>
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
                                        <td>{ev.dateDebut}</td>
                                        <td>{ev.dateFin}</td>
                                        <td>{ev.dateCreation}</td>
                                        <td>{ev.dateModification}</td>
                                        <td>{ev.typeEvenement}</td>
                                        <td>{ev.etat}</td>
                                    </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}