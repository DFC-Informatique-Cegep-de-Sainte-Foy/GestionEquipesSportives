import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import iconeInvitation from '../images/iconeInvitation.png'; 
import codeEnGuid from '../images/codeEnGuid.png'

function PageInviterOuAjouterJoueur(){
    const navigate = useNavigate();
    const { id } = useParams();

  return (
    <Container>
        <Row>
            <h2 style={{textAlign: "center"}}>Inviter ou Ajouter de nouveaux membres</h2>
        </Row>
        <p></p>
        <p></p>

        <Row style={{textAlign: "center", justifyContent: 'center'}}>
            <Card style={{ width: '20rem', marginRight: "10px"}}>
                <Card.Img variant="top" src={codeEnGuid} height={150} width={100}/>
                <Card.Body>
                    <Button variant="dark" onClick={() => navigate(`/saisirEtEnvoyerInvitation/${id}`)}>
                        <Card.Title>Inviter de nouveaux membres</Card.Title>
                    </Button>
                    <p></p>
                    <p></p>
                    <Card.Text>
                        Envoyer un email au membre que vous voulez ajouter dans votre équipe.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card style={{ width: '20rem', marginLeft: "10px"}}>
                <Card.Img variant="top" src={iconeInvitation} height={150} width={100}/>
                <Card.Body>
                    <Button variant="dark" onClick={() => navigate(`/formulaireUtilisateur/${id}`)}>
                        <Card.Title>Ajouter de nouveaux membres</Card.Title>
                    </Button>
                    <p></p>
                    <p></p>
                    <Card.Text>
                        Vous pouvez ajouter vos membres en saisissant leurs informations personnelles.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Row>
    </Container>
  )
}

export default PageInviterOuAjouterJoueur