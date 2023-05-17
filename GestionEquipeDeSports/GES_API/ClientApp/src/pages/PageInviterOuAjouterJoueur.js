import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';

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

        <Row>

            <Col>
                

                    <Card style={{ width: '20rem' }}>

                        <Card.Img variant="top" src="holder.js/100px180" />

                        <Card.Body>

                            <Button variant="dark" onClick={() => navigate(`/formulaireUtilisateur/${id}`)}>
                                <Card.Title>Inviter de nouveaux membres</Card.Title>
                            </Button>
                            

                            <Card.Text>
                                Récupérez l'id de l"équipe pour l'envoyer par email aux membres de l'équipe.
                            </Card.Text>

                        </Card.Body>

                    </Card>


                
            </Col>

            <Col>
                <Link to={`/formulaireUtilisateur/${id}`}>
                    Ajouter
                </Link>
            </Col>

            
        
           


            

        </Row>

    </Container>
  )
}

export default PageInviterOuAjouterJoueur