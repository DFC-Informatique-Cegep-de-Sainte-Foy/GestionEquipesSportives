import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export class FormEvenement extends React.Component{
    render(){
        return(
            <>
                <h2>Ajouter un evenement</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Sport</Form.Label>
                        <Form.Select id="id_sport"  >
                            <option disabled>Choisir une option</option>
                            <option value="soccer">Soccer</option>
                            <option value="baseball">Baseball</option>
                            <option value="football">Football</option>
                            <option value="natation">Natation</option>
                        </Form.Select>                    
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nom Evenement</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Une champ ici</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                    <Button class="btn btn-success">Ajouter un evenement</Button>
                </Form>
            </>
        );
    }
}