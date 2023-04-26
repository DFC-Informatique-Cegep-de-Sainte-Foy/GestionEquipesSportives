import React from "react";
import { Equipe } from "./Equipe";

export const ListeEquipesPourUtilisateur = (props) => {
    var equipes = props.eq;
    return (
        <tbody>
            {equipes.map((e, index) => {
                return <Equipe 
                        key={e.idEquipe}
                        idEquipe={e.idEquipe}
                        num={index + 1}
                        nom={e.nom}
                        region={e.region}
                        sport={e.sport}
                        asportive={e.associationSportive}
                    />
            })}
        </tbody>
    )
}
