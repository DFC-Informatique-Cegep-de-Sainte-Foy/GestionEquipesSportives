import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const { getAccessTokenSilently } = useAuth0();
    return (
      <Component {...props} getAccessTokenSilently={getAccessTokenSilently} />
    );
  }
}

class Equipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipes: []
    };
  }

  async componentDidMount() {
    const token = await this.props.getAccessTokenSilently();

    await fetch("api/Equipe", {
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then((result) => {
        this.setState({
          equipes: result
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Page des équipes</h1>
        <Link to={'/formulaireEquipe'}>
          <Button variant="success" className="btn btn-success">Ajouter une équipe</Button><p></p>
        </Link>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Region</th>
              <th>Sport</th>
              <th>Association sportive</th>
            </tr>
          </thead>
          <tbody>
            {this.state.equipes.map((eq, index) => (
              <tr key={eq.idEquipe}>
                <td>{index + 1}</td>
                <td><Link to={{ pathname: `/uneEquipe/${eq.idEquipe}` }}>{eq.nom}</Link></td>
                <td>{eq.region}</td>
                <td>{eq.sport}</td>
                <td>{eq.associationSportive}</td>
              </tr>
            ))
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default withMyHook(Equipes);