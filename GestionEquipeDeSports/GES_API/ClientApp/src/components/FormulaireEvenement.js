import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export function FormEvenement(){
    const [descriptionEvenement, setDescriptionEvenement] = useState("");
    const [emplacementEvenement, setEmplacementEvenement] = useState("");
    const [dateDebutEvenement, setDateDebutEvenement] = useState("");
    const [dateFinEvenement, setDateFinEvenement] = useState("");
    const [dateCreationEvenement, setDateCreationEvenement] = useState("");
    const [dateModificationEvenement, setDateModificationEvenement] = useState("");
    const [typeEvenement, setTypeEvenement] = useState("");
    const [etatEvenement, setEtatEvenement] = useState("");


    const optionsRequete = {
        method: 'POST',
        //mode: 'cors', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            Description: descriptionEvenement, 
            Emplacement: emplacementEvenement, 
            DateDebut: dateDebutEvenement,
            DateFin: dateFinEvenement,
            DateCreation: dateCreationEvenement,
            DateModification: dateModificationEvenement,
            TypeEvenement: typeEvenement,
            Etat: etatEvenement})
    };


    function handleChange(e){
        if(e.target.id === "description")
        {
            //setDescriptionEvenement(e.taget.value);
            console.log(e.target.value);
        }
        else if(e.target.id === "emplacement")
        {
            console.log(e.target.value);
            //setEmplacementEvenement(e.target.value);
        }
        else if(e.target.id === "dateDebut")
        {
            console.log(e.target.value);
            //setDateDebutEvenement(e.target.value);
        }
        else if(e.target.id === "dateFin")
        {
            console.log(e.target.value);
            //setDateFinEvenement(e.target.value);
        }
        else if(e.target.id === "dateCreation")
        {
            console.log(e.target.value);
            //setDateCreationEvenement(e.target.value);
        }
        else if(e.target.id === "dateModification")
        {
            console.log(e.target.value);
            //setDateModificationEvenement(e.target.value);
        }
        else if(e.target.id === "typeEvenement")
        {
            console.log(e.target.value);
            //setTypeEvenement(e.target.value);
        }
        else if(e.target.id === "etat")
        {
            console.log(e.target.value);
            //setEtatEvenement(e.target.value);
        }
    }

    return(
        <div className="container col-xl-10">
            <div className="row align-items-center g-lg-5 py-5">
                <div className="col-xl-10 mx-auto col-lg-5">
                    <div className="p-4 p-md-5 border rounded-3 bg-light">
                        <div className="mb-3">
                            <h1 className="text-center">Ajouter un nouvel événement</h1>
                        </div>
                        
                        <form>
                            <div className="form-group">
                                <label for="description">Description</label>
                                <input type="text" onChange={handleChange} className="form-control" id="description" name="description" placeholder="Entrer la description"/>
                            </div>
                            <div className="form-group">
                                <label for="emplacement">Emplacement</label>
                                <input type="text" onChange={handleChange} className="form-control" id="emplacement" name="emplacement" placeholder="Entrer l'emplacement"/>
                            </div>
                            <div className="form-group">
                                <label for="dateDebut">Date début</label>
                                <input type="datetime" onChange={handleChange} className="form-control" id="dateDebut" name="dateDebut" placeholder="Entrer la dateDebut"/>
                            </div><p></p>

                            <div className="form-group">
                                <label for="dateFin">Date Fin</label>
                                <input type="datetime" onChange={handleChange} className="form-control" id="dateFin" name="dateFin" placeholder="Entrer la dateFin"/>
                            </div><p></p>

                            <div className="form-group">
                                <label for="dateCreation">Date Création</label>
                                <input type="datetime-local" onChange={handleChange} className="form-control" id="dateCreation" name="dateCreation" placeholder="Entrer la dateCreation"/>
                            </div><p></p>

                            <div className="form-group">
                                <label for="dateModification">Date Modification</label>
                                <input type="datetime-local" onChange={handleChange} className="form-control" id="dateModification" name="dateModification" placeholder="Entrer la dateModification"/>
                            </div><p></p>

                            <div className="form-group">
                                <label for="typeEvenement">Type Evenement</label>
                                <input type="number" onChange={handleChange} className="form-control" id="typeEvenement" name="typeEvenement" placeholder="Entrer le typeEvenement"/>
                            </div><p></p>

                            <div className="form-group">
                                <label for="etat">Etat</label>
                                <input type="number" onChange={handleChange} className="form-control" id="etat" name="etat" placeholder="Entrer l'etat"/>
                            </div><p></p>
                            
                            <Link style={{textDecoration: 'none', color: 'white'}} to="/evenements">
                                <button type="button" onClick={ () =>
                                    fetch('api/evenements', optionsRequete)
                                    .then(function(reponse){
                                        console.log(reponse);
                                        return reponse.json();

                                    }).catch(function(error){
                                        console.log(error)
                                    })
                                } className="btn btn-primary">Ajouter</button>&nbsp;
                            </Link>

                            <Link to="/evenements">
                                <button type="button" className="btn btn-danger">Annuler</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
//export default PageAjouter;













