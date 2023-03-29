import React, { useState } from "react";
import { Link } from "react-router-dom";

export function FormEvenement() {
    const [descriptionEvenement, setDescriptionEvenement] = useState("");
    const [emplacementEvenement, setEmplacementEvenement] = useState("");
    const [dateDebutEvenement, setDateDebutEvenement] = useState("");
    const [dateFinEvenement, setDateFinEvenement] = useState("");
    const [typeEvenement, setTypeEvenement] = useState("");
    const [erreurDonnees, setErreurDonnees] = useState(false);
    const [confirmationAjout, setConfirmationAjout] = useState("");

    const optionsRequete = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Description: descriptionEvenement,
            Emplacement: emplacementEvenement,
            DateDebut: dateDebutEvenement,
            DateFin: dateFinEvenement,
            TypeEvenement: typeEvenement
        })
    };

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
        else if (e.target.id === "dateFin") {
            console.log(e.target.value);
            setDateFinEvenement(e.target.value);
        }
        else if (e.target.id === "typeEvenement") {
            console.log(e.target.value);
            setTypeEvenement(e.target.value);
        }
    }

    function verifierDonnees() 
    {
        if (descriptionEvenement !== "" && emplacementEvenement !== "" && dateDebutEvenement < dateFinEvenement) 
        {
            setErreurDonnees(false);

            fetch('api/evenements', optionsRequete)
                .then(function (reponse) {
                    console.log(reponse);
                    setConfirmationAjout("Ajout de l'évenement réussi!");

                }).catch(function (error) {
                    console.log(error)
                }
            )
        }
        else 
        {
            setErreurDonnees(true);
        }
    }

    return (
        <div className="container col-xl-10">
            <div className="row align-items-center g-lg-5 py-5">
                <div className="col-xl-10 mx-auto col-lg-5">
                    <div className="p-4 p-md-5 border rounded-3 bg-light">
                        <div className="mb-3">
                            <h1 className="text-center">Ajouter un nouvel événement</h1>
                        </div>
                        <small className="text-success">{confirmationAjout}</small>
                        <form>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input type="text" onChange={handleChange} className="form-control" id="description" name="description" placeholder="Entrer la description" required/>                                             
                            </div>

                            <div className="form-group">
                                <label htmlFor="emplacement">Emplacement</label>
                                <input type="text" onChange={handleChange} className="form-control" id="emplacement" name="emplacement" placeholder="Entrer l'emplacement" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dateDebut">Date début</label>
                                <input type="datetime-local" onChange={handleChange} className="form-control" id="dateDebut" name="dateDebut" placeholder="Entrer la dateDebut" required/>                               
                            </div><p></p>

                            <div className="form-group">
                                <label htmlFor="dateFin">Date Fin</label>
                                <input type="datetime-local" onChange={handleChange} className="form-control" id="dateFin" name="dateFin" placeholder="Entrer la dateFin" required/>                             
                            </div><p></p>

                            <div className="form-group">
                                <label htmlFor="typeEvenement">Type Événement</label>
                                <select id="typeEvenement" name="typeEvenement" onChange={handleChange} className="form-control" required>
                                    <option value="">Choisir un événement</option>
                                    <option value="1">Entrainement</option>
                                    <option value="2">Partie</option>
                                    <option value="3">Autre</option>
                                </select>
                                <small>Veuillez choisir un type d'événement</small>
                            </div><p></p>

                            {erreurDonnees && <span style={{ color: 'red' }}>*Les données saisies sont incorrectes, veuillez vérifier.</span>}
                            <p></p>

                            
                            <button type="button" onClick={verifierDonnees} className="btn btn-primary">Ajouter</button>&nbsp;
                            
                            
                            <Link to="/evenements">
                                <button type="button" className="btn btn-danger">Annuler</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
}














