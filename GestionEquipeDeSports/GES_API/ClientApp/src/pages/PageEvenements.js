import React from "react";
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { BiTrash, BiEdit } from "react-icons/bi";
import { useAuth0 } from '@auth0/auth0-react';
import EvenementService from '../services/EvenementService.js';

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const { getAccessTokenSilently } = useAuth0();
        return (
            <Component {...props} getAccessTokenSilently={getAccessTokenSilently} />
        );
    }
}

class Evenements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            evenements: []
        };
    }

    async componentDidMount() {
        const token = await this.props.getAccessTokenSilently();

        await fetch("api/evenements", {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
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
                <h1>Bienvenue dans la page des événements</h1>
                <Link to={'/formulaireEvenement'}>
                    <Button variant="success" className="btn btn-success" >Ajouter un événement</Button><p></p>
                </Link>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Événement</th>
                            <th>Emplacement</th>
                            <th>Date début</th>
                            <th>Date fin</th>
                            <th>Type événement</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.evenements.map((ev, index) => (
                            <tr key={ev.id}>
                                <td>{index + 1}</td>
                                <td><Link to={{ pathname: `/unEvenement/${ev.id}` }}>{ev.description}</Link></td>
                                <td>{ev.emplacement}</td>
                                <td>{EvenementService.formatDateTime(ev.dateDebut)}</td>
                                <td>{EvenementService.formatDateTime(ev.dateFin)}</td>
                                <td>{EvenementService.affichageTypeEvenement(ev.typeEvenement)}</td>
                                <td>
                                    <Link to={{ pathname: `/modifieEvenement/${ev.id}` }}>
                                        <Button variant='warning' size="sm" className="me-2" title="Modifier"> <BiEdit /> </Button>
                                    </Link>
                                    <Link to={{ pathname: `/supprimerEvenement/${ev.id}` }}>
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

export default withMyHook(Evenements);
