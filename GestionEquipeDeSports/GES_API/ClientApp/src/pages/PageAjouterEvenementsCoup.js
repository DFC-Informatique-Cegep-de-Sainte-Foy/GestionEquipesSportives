import React, { useState, useEffect } from "react";
import { Button, Container, Form, Table, Alert } from "react-bootstrap";
import Papa from "papaparse";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

// code de base https://react-papaparse.js.org/

export const PageAjouterEvenementsCoup = () => {
    // const [evenementsChampText, setEvenementsChampText] = useState('');
    const [parsedFichier, setParsedFichier] = useState([]);
    const [tableauRows, setTableauRows] = useState([]);
    const [valuesCellules, setValuesCellules] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const [idUtilisateur, setIdUtilisateur] = useState('');
    const [reponseConfirmation, setReponseConfirmation] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth0();

    useEffect(() => {
        getUtilisateur(user.email);
    }, []);

    async function getUtilisateur(email) {
        const token = await getAccessTokenSilently();
        // console.log(email);
        await fetch(`api/utilisateur/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then((result) => {
            setIdUtilisateur(result.idUtilisateur);
            // console.log(result);
        }).catch(function (error) {
            console.log(error);
        });
    }

    const handleChange = (e) => {
        // console.log(e.target.value);
        // setEvenementsChampText(e.target.value);
        Papa.parse(e.target.value, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                // console.log(results.data);
                const rowsTableau = [];
                const valuesTableau = [];
                
                results.data?.map((donnees) => {
                    rowsTableau.push(Object.keys(donnees));
                    valuesTableau.push(Object.values(donnees));
                })

                setParsedFichier(results.data);
                setTableauRows(rowsTableau[0]);
                setValuesCellules(valuesTableau);
            }
        })
    }

    const changeHandler = (event) => {
        // console.log(event.target.files[0]);
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                // console.log(results.data);
                const rowsTableau = [];
                const valuesTableau = [];

                results.data?.map((donnees) => {
                    rowsTableau.push(Object.keys(donnees));
                    valuesTableau.push(Object.values(donnees));
                });

                setParsedFichier(results.data);
                setTableauRows(rowsTableau[0]);
                setValuesCellules(valuesTableau);
            },
        });
    };

    // function annulerDonnees(){
    //     setParsedFichier([]);
    //     setTableauRows([]);
    //     setValuesCellules([]);
    //     setEvenementsChampText('');
    // }

    async function enregistrerDonnees(){
        var donneesCorrigeeASauvegarder = [];
        var donneesACorriger = parsedFichier;
        for(var i = 0; i < donneesACorriger.length; i++){
            var array = {};
            // console.log(donneesACorriger[i]);
            array.Description = donneesACorriger[i].Description;
            array.Emplacement = donneesACorriger[i].Emplacement;
            let dateHeureDebut = donneesACorriger[i].DateDebut + 'T' + donneesACorriger[i].HeureDebut;
            array.DateDebut = dateHeureDebut;
            array.DateFin = trouverDateFin(dateHeureDebut, donneesACorriger[i].Duree);
            array.TypeEvenement = trouverTypeEvenement(donneesACorriger[i].TypeEvenement);
            donneesCorrigeeASauvegarder.push(array);
        }

        // console.log(donneesCorrigeeASauvegarder);
        const token = await getAccessTokenSilently();
        const optionRequetePostEvenement = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(donneesCorrigeeASauvegarder)
        };
        //ajout dans table evenements
        const reponse = await fetch('api/AjouterEvenementsCoup', optionRequetePostEvenement);
        const data = await reponse.json();

        //ajout dans table EquipeEvenement
        for (let i = 0; i < data.length; i++) {            
        
            const optionsRequeteEquipeEvenement = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    Fk_Id_Equipe: id,
                    Fk_Id_Evenement: data[i].id
                })
            };
            await fetch('api/equipeEvenement', optionsRequeteEquipeEvenement)
            .then(function (reponse) {
                // console.log(reponse);
            }).catch(function (error) {
                console.log(error)
            })
        };

        //ajout dans table EvenementJoueur
        for(let j = 0; j < data.length; j++) {
            const optionsRequeteJoueurEvenement = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                FK_Id_Utilisateur: idUtilisateur,
                FK_Id_Evenement: data[j].id,
                EstPresentAEvenement: false
            })
            };
            await fetch('api/evenementJoueur', optionsRequeteJoueurEvenement)
            .then(function (reponse) {
                // console.log(reponse);
                if(reponse.ok){
                    setReponseConfirmation("Les événements ont été ajoutés avec succès!");
                } else {
                    setReponseConfirmation("Il y a une erreur!");
                }
            }).catch(function (error) {
                console.log(error)
            })
        }
    }

    function trouverDateFin(dateDebut, duree){
        var dateDebutParsed = Date.parse(dateDebut);
        var heureDuree = heuresParse(duree);
        // je n'ai pas trouvé une solution pour afficher date de fin en heure locale, donc je soustrais juste 4 heures en millisecondes
        var dateFinTrouvee = new Date(dateDebutParsed + heureDuree - 14400000).toISOString();
        return dateFinTrouvee;
    }

    function heuresParse(heures){
        let indexSymbol = heures.indexOf(':');
        if(indexSymbol > 0) {
            var heuresparsed = heures.split(':')[0];
            var minutesParsed = heures.split(':')[1];
            var minutesMilliseconds = minutesParsed * 60 * 1000;
            var heuresMilliseconds = heuresparsed * 60 * 60 * 1000;
            
            return minutesMilliseconds + heuresMilliseconds;
        } else {
            var minutesEnMilliseconds = heures * 60 * 1000;
            return minutesEnMilliseconds;
        }
    }

    function trouverTypeEvenement(evenement){
        if(evenement === "Entrainement"){
            return 0;
        }
        else if(evenement === "Partie"){
            return 1;
        }
        else{
            return 2;
        }
    }

    return (
        <Container>
            <Alert variant="info">
                <p>Les champs suivants sont obligatoires dans votre fichier CSV <b>Description</b> <b>Emplacement</b> <b>DateDebut</b> <b>HeureDebut</b> <b>Duree</b> <b>TypeEvenement</b></p>
            </Alert>
            <Form.Group className="mb-3">
                <Form.Label>Choisir le fichier de type csv</Form.Label>
                <Form.Control type="file" name="file" accept=".csv" onChange={changeHandler}></Form.Control>
            </Form.Group>
            <p>Ou</p>
            <Form.Group className="mb-3">
                <Form.Label>Copier coller les données de votre fichier CSV dans ce champ de texte</Form.Label>
                <Form.Control as="textarea" onChange={handleChange} rows={3}></Form.Control>
            </Form.Group>

            <Table>
                <thead>
                    <tr>
                        {tableauRows?.map((rows, index) => {
                            return <th key={index}>{rows}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {valuesCellules?.map((value, index) => {
                        return (
                            <tr key={index}>
                                {value.map((val, i) => {
                                    return <td key={i}>{val}</td>
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {reponseConfirmation && <p style={{color:"green"}}>{reponseConfirmation}</p>}
            {parsedFichier.length > 0 && <Button variant="success" onClick={enregistrerDonnees}>Enregistrer</Button>}{' '}
            {/* {parsedFichier.length > 0 && <Button variant="info" onClick={annulerDonnees}>Annuler</Button>}{' '} */}
            <Button variant="danger" onClick={() => navigate(-1)}>Retour</Button>
        </Container>
    )
}