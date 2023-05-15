import React from "react";
import { Evenement } from "./Evenement";

export const ListeEvenementsPourUtilisateur = (props) => {
    // console.log(props.ev);
    var evenementsPourUtilisateur = props.ev;
    // console.log('Function ListeEvenementsPourUtilisateur :');
    // console.log(evenementsPourUtilisateur);
    return (
        <tbody>
            {Array.isArray(evenementsPourUtilisateur) ? evenementsPourUtilisateur.map((e, index) => {
                return <Evenement
                    key={e.id}
                    id={e.id}
                    num={index + 1}
                    description={e.description}
                    emplacement={e.emplacement}
                    dateDebut={e.dateDebut}
                    dateFin={e.dateFin}
                />
            }) : <Evenement
                key={evenementsPourUtilisateur.id}
                id={evenementsPourUtilisateur.id}
                num={1}
                description={evenementsPourUtilisateur.description}
                emplacement={evenementsPourUtilisateur.emplacement}
                dateDebut={evenementsPourUtilisateur.dateDebut}
                dateFin={evenementsPourUtilisateur.dateFin}
            />}
        </tbody>

    )
}
