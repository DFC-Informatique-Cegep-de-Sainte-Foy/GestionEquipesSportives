import React from "react";

export const CalculerDuree = (props) => {
    var dateDebut = props.dateACalculer[0];
    var dateFin = props.dateACalculer[1];
    var dateDebutParsed = Date.parse(dateDebut);
    var dateFinParsed = Date.parse(dateFin);
    var result = (dateFinParsed - dateDebutParsed) / 60000;
    if (result > 60) {
        var dureeH = result / 60;
        dureeH = dureeH.toFixed();
        var dureeM = result % 60;
        return (
            <>
                {dureeH}H {dureeM}min
            </>
        )
    }
    else {
        return (
            <>
                {result}min
            </>
        )
    }
}
