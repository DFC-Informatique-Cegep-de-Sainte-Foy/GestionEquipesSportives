import React, { useState, useEffect } from "react";
import { Container, Row } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

function PageRejoindreUneEquipe(){
    const [idEquipe, setIdEquipe] = useState("");
    const [idJoueurConnecte, setIdJoueurConnecte] = useState("");
    const { getAccessTokenSilently, user } = useAuth0();

    function handleChange(e){
        setIdEquipe(e.target.value);
    }

    function handleClick(){
        console.log(idEquipe);
        console.log(idJoueurConnecte);
        ajouterLeJoueurDansLEquipe();
    }

    async function getJoueurDuBackend(email) {
        const token = await getAccessTokenSilently();

        const resultat = await fetch(`api/Utilisateur/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });

        if (!resultat.ok) 
        {
            throw new Error("Le joueur n'existe pas dans la base de donnée.");
        }

        const body = await resultat.json();
        console.log(body.idUtilisateur);
        setIdJoueurConnecte(body.idUtilisateur);
    }

    useEffect(() => {
        getJoueurDuBackend(user.email);
    }, []);


    async function ajouterLeJoueurDansLEquipe() {
        const token = await getAccessTokenSilently();

        const optionsRequeteEquipeJoueur = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                Fk_Id_Utilisateur: idJoueurConnecte,
                FK_Id_Equipe: idEquipe
            })
        };

        await fetch('api/equipeJoueur', optionsRequeteEquipeJoueur)
        .then(function (reponse) {
            console.log(reponse);
        }).catch(function (error) {
            console.log(error)
        })
    }
    
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