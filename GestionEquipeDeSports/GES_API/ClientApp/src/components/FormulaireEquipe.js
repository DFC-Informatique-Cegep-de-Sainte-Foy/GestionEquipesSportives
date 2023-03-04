import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export class FormEquipe extends React.Component{
    render(){
        return(
            <>
                <h2>Ajouter une équipe</h2>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Sport</Form.Label>
                        <Form.Select id="id_sport"  >
                            <option>Choisir une option</option>
                            <option value="soccer">Soccer</option>
                            <option value="baseball">Baseball</option>
                            <option value="football">Football</option>
                            <option value="natation">Natation</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nom Equipe</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Region</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Association Sportive</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                    
                    <Button variant="success" type="submit">Ajouter</Button>
                    <Button variant="danger" className="float-end">Annuler</Button>
                </Form>
            </>
        );
    }
}