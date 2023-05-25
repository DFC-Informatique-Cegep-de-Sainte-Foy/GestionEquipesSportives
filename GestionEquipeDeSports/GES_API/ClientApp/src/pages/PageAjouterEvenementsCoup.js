import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";

export const PageAjouterEvenementsCoup = () => {
    const [evenementsChampText, setEvenementsChampText] = useState('');
    
    function handleChange(e){
        console.log(e.target.value);
        setEvenementsChampText(e.target.value);
    }

    return (
        <Container>
            <Form.Group className="mb-3">
                <Form.Label>Choisir le fichier de type csv</Form.Label>
                <Form.Control type="file"></Form.Control>
            </Form.Group>
            <p>Ou</p>
            <Form.Group className="mb-3">
                <Form.Label>Entrer des données dans ce champ de texte</Form.Label>
                <Form.Control as="textarea" onChange={handleChange} rows={3}></Form.Control>
            </Form.Group>
        </Container>
    )
}