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

        <Row style={{textAlign: "center", justifyContent: 'center', paddingLeft: "10px"}}>
            <Card style={{ width: '20rem', marginRight: "10px"}}>
                <Card.Img variant="top" src={codeEnGuid} height={150} width={100}/>
                <Card.Body>
                    <Button variant="dark" onClick={() => navigate(`/formulaireUtilisateur/${id}`)}>
                        <Card.Title>Inviter de nouveaux membres</Card.Title>
                    </Button>
                    <p></p>
                    <p></p>
                    <Card.Text>
                        Récupérez l'id de l"équipe pour l'envoyer par email aux membres de l'équipe.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card style={{ width: '20rem', marginLeft: "10px"}}>
                <Card.Img variant="top" src={codeEnGuid} height={150} width={100}/>
                <Card.Body>
                    <Button variant="dark" onClick={() => navigate(`/formulaireUtilisateur/${id}`)}>
                        <Card.Title>Inviter de nouveaux membres</Card.Title>
                    </Button>
                    <p></p>
                    <p></p>
                    <Card.Text>
                        Récupérez l'id de l"équipe pour l'envoyer par email aux membres de l'équipe.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Row>
    </Container>
  )
}

export default PageInviterOuAjouterJoueur