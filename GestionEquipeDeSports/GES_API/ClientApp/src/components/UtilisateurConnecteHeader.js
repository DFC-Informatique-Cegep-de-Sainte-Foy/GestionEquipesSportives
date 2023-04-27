import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {  Row, Col } from 'react-bootstrap';

function UtilisateurConnecteHeader(){
    const [utilisateur, setUtilisateur] = useState({});
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        async function getUtilisateur() {
          const token = await getAccessTokenSilently();
          
          try{
            const resultat = await fetch(`api/utilisateur/${user.email}`, {
              headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
            })
            const body = await resultat.json();
            setUtilisateur(body);  
          }
          catch (err) 
          {
            console.log(err);
          }
        }
        getUtilisateur();
    }, []);

    if (isAuthenticated === true)
    {
        return(
            <Row>
                <Col style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>Bonjour {utilisateur.prenom} !</Col>
            </Row>
        );
    }
}

export default UtilisateurConnecteHeader;