import React, { useState, useEffect } from "react";
import { Container, Row } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

function PageRejoindreUneEquipe(){
    const [identifiant, setIdentifiant] = useState("");
    const [listeDesJoueursDeLEquipe, setListeDesJoueursDeLEquipe] = useState([]);
    const { getAccessTokenSilently } = useAuth0();

    function handleChange(e){
        setIdentifiant(e.target.value);
    }

    function handleClick(){
        console.log(identifiant);
        getJoueurs(identifiant);
        console.log(listeDesJoueursDeLEquipe);
    }

    async function getJoueurs(id) {
        const token = await getAccessTokenSilently();

        await fetch(`api/equipeJoueur/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                setListeDesJoueursDeLEquipe(result);
            })
            .catch((error) => {
                console.error('Error:', error);
            }
        );
    }

    useEffect(() => {
        getJoueurs(identifiant);
    }, []);






    return(
        <Container style={{ justifyContent: 'center'}}>
            <Row>
                <h2 >Comment rejoindre une équipe sur 
                    <span className='text-success'> Gestion</span><span className='text-primary'>Equipe</span><span className='text-warning'>Sportive</span>
                </h2>
            </Row>
            <p></p>
            <p></p>
            <Row >
                <h3>1. Le responsable d'équipe vous a invité par email.</h3><p></p>
                <p>Regardez dans vos emails si vous avez reçu une invitation.<br></br>Dans l'email, copiez l'id de l'équipe et collez le dans le champ ci-dessous, puis cliquez sur Rejoindre.</p>

                <div className="col-xl-8">
                    <input type="text" onChange={handleChange} className="form-control" id="identifiant" name="identifiant" placeholder="Rentrer l'id de l'équipe" required />
                    <p></p>
                    <button type="button" onClick={handleClick} className="btn btn-primary">Rejoindre</button>
                </div>
            </Row>
        </Container>
    );
}

export default PageRejoindreUneEquipe;