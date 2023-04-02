import React from 'react';
import Alert from 'react-bootstrap/Alert'

function Erreur404(){
    return(
        <Alert variant="danger">
            <h1>Erreur 404 : La ressource sollicitée n'existe pas</h1>
        </Alert>
    );
}

export default Erreur404;