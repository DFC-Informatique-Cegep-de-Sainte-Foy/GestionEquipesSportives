import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

export function FormEvenement() {
    const [descriptionEvenement, setDescriptionEvenement] = useState("");
    const [emplacementEvenement, setEmplacementEvenement] = useState("");
    const [dateDebutEvenement, setDateDebutEvenement] = useState("");
    const [duree, setDuree] = useState("");
    const [typeEvenement, setTypeEvenement] = useState("");
    const [erreurDonnees, setErreurDonnees] = useState(false);
    const [confirmationAjout, setConfirmationAjout] = useState("");
    const [idUtilisateur, setIdUtilisateur] = useState('');
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [today, setToday] = useState('');

    const { id } = useParams();

    const { user } = useAuth0();

    async function getUtilisateur(email) {
        const token = await getAccessTokenSilently();
        console.log(email);
        await fetch(`api/utilisateur/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                if (result === null) {
                    return;
                }
                else {
                    console.log(result);
                    setIdUtilisateur(result.idUtilisateur);
                    console.log(result);
                }
            }).catch(function (error) {
                console.log(error);
            });
    }

    async function verifierDonnees() {
        const token = await getAccessTokenSilently();

        const optionsRequete = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                Description: descriptionEvenement,
                Emplacement: emplacementEvenement,
                DateDebut: dateDebutEvenement,
                Duree: duree,
                TypeEvenement: typeEvenement
            })
        };

        if (descriptionEvenement !== "" && emplacementEvenement !== "") {
            setErreurDonnees(false);

            //ajout dans table evenements
            const reponse = await fetch('api/evenements', optionsRequete);
            console.log(reponse);
            const data = await reponse.json();
            console.log(data);

            const optionsRequeteEquipeEvenement = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    Fk_Id_Equipe: id,
                    Fk_Id_Evenement: data
                })
            };
            await fetch('api/equipeEvenement', optionsRequeteEquipeEvenement)
                .then(function (reponse) {
                    console.log(reponse);
                }).catch(function (error) {
                    console.log(error)
                })

            //ajout dans table EvenementJoueur
            const optionsRequeteJoueurEvenement = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    FK_Id_Utilisateur: idUtilisateur,
                    FK_Id_Evenement: data,
                    EstPresentAEvenement: false
                })
            };
            await fetch('api/evenementJoueur', optionsRequeteJoueurEvenement)
                .then(function (reponse) {
                    console.log(reponse);
                    if (reponse.ok) {
                        setConfirmationAjout("Ajout de l'évenement réussi!");
                    }
                }).catch(function (error) {
                    console.log(error)
                })
        }
        else {
            setErreurDonnees(true);
        }
    }

    function handleChange(e) {
        if (e.target.id === "description") {
            console.log(e.target.value);
            setDescriptionEvenement(e.target.value);
        }
        else if (e.target.id === "emplacement") {
            console.log(e.target.value);
            setEmplacementEvenement(e.target.value);
        }
        else if (e.target.id === "dateDebut") {
            console.log(e.target.value);
            setDateDebutEvenement(e.target.value);
        }
        else if (e.target.id === "duree") {
            console.log(e.target.value);
            setDuree(e.target.value);
        }
        else if (e.target.id === "typeEvenement") {
            console.log(e.target.value);
            setTypeEvenement(e.target.value);
        }
    }

    useEffect(() => {
        if (confirmationAjout !== "") {
           alert("Ajout de l'évenement réussi!");
        }
    }, [confirmationAjout]); 

    useEffect(() => {
        getUtilisateur(user.email);
    }, []);

    useEffect(() => {
        const date = new Date();
        const localDateString = date.toISOString().substring(0, 16);
        setToday(localDateString);
    }, []);

    return (
        <div className="container col-xl-10">
            <div className="row align-items-center g-lg-5 py-5">
                <div className="col-xl-10 mx-auto col-lg-5">
                    <div className="p-4 p-md-5 border rounded-3 bg-light">
                        <div className="mb-3">
                            <h1 className="text-center">Ajouter un nouvel événement</h1>
                        </div>
                        {/* <small className="text-success">{confirmationAjout}</small> */}
                        <form>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text" onChange={handleChange}
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    placeholder="Entrer la description"
                                    required
                                />
                            </div><p></p>

                            <div className="form-group">
                                <label htmlFor="emplacement">Emplacement</label>
                                <input type="text"
                                    onChange={handleChange}
                                    className="form-control"
                                    id="emplacement"
                                    name="emplacement"
                                    placeholder="Entrer l'emplacement"
                                    required
                                />
                            </div><p></p>

                            <div className="form-group">
                                <label htmlFor="dateDebut">Date début</label>
                                <input
                                    type="datetime-local"
                                    onChange={handleChange}
                                    className="form-control"
                                    id="dateDebut"
                                    name="dateDebut"
                                    placeholder="Entrer la dateDebut"
                                    min={today}
                                    required
                                />
                            </div><p></p>

                            <div className="form-group">
                                <label htmlFor="duree">Durée (en minutes)</label>
                                <input type="number"
                                    onChange={handleChange}
                                    className="form-control"
                                    id="duree" name="duree"
                                    placeholder="Entrer la durée"
                                    min={0}
                                    required
                                />
                            </div><p></p>

                            <div className="form-group">
                                <label htmlFor="typeEvenement">Type Événement</label>
                                <select id="typeEvenement"
                                    name="typeEvenement"
                                    onChange={handleChange}
                                    className="form-control"
                                    required>
                                    <option value="">Choisir un événement</option>
                                    <option value="0">Entrainement</option>
                                    <option value="1">Partie</option>
                                    <option value="2">Autre</option>
                                </select>
                            </div><p></p>

                            {erreurDonnees && <span style={{ color: 'red' }}>*Les données saisies sont incorrectes, veuillez vérifier.</span>}
                            <p></p>


                            <button type="button" onClick={verifierDonnees} className="btn btn-primary">Ajouter</button>&nbsp;

                            <button type="button" onClick={() => navigate(-1)} className="btn btn-danger">Retour</button>

                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
}














