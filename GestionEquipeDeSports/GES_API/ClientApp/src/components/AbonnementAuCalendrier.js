import React, { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from "react-router-dom";

export const AbbonnementAuCalendrier = () => {
    const [evenementsArray, setEvenementsArray] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    // console.log(props);

    // var lienPourAbonnement = `/abonnement/${id}`;
    const { id } = useParams();
    console.log(id);
    var evenements;

    useEffect(() => {
        obtenirEvenements();
    }, []);

    async function obtenirEvenements(){
        const token = await getAccessTokenSilently();
console.log('demande evenements :');
        await fetch(`api/evenementJoueur/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
          })
            .then(res => res.json())
            .then((result) => {
                setEvenementsArray(result);
            }).catch(function (error) {
                console.log(error);
            });

            console.log('debut fichier ics :');
            // var evenements;
            evenements = 'BEGIN:VCALENDAR\r\n';
            evenements = evenements + 'PRODID:-GestionEquipeSportive v1.0\r\n';
            evenements = evenements + 'VERSION:2.0\r\n';    
            evenements = evenements + 'CALSCALE:GREGORIAN\r\n';
            evenements = evenements + 'METHOD:PUBLISH\r\n';
            // var UID = 0;
        
            var dateTime = new Date();
            var isoDate = dateTime.toISOString();
            var dateTimeSansSymbols = retireSymbolsDesDate(isoDate);
            var dateTimeStamp = dateTimeSansSymbols.substring(0, 15);
            // console.log(event);
        
            evenementsArray.forEach(element => {
                evenements = evenements + 'BEGIN:VEVENT\r\n';
                // UID++;
                evenements = evenements + 'DTSTAMP:' + dateTimeStamp +  'Z\r\n';
                evenements = evenements + 'DTSTART:' + retireSymbolsDesDate(element.dateDebut) + '\r\n';
                evenements = evenements + 'DTEND:' + retireSymbolsDesDate(element.dateFin) + '\r\n';
                evenements = evenements + 'UID:' + element.id+ '@gestionequipesportive.ca' + '\r\n';
                evenements = evenements + 'SUMMARY:' + element.description + '\r\n';
                evenements = evenements + 'LOCATION:' + element.emplacement + '\r\n';
                evenements = evenements + 'END:VEVENT\r\n';
            });
            evenements = evenements + 'END:VCALENDAR\r\n';
        
            console.log(evenements);
    }


    //informations de base tirées de ces sources
    // https://datatracker.ietf.org/doc/html/rfc5545
    // https://icalendar.org/Home.html
// console.log('debut fichier ics :');
//     var evenements;
//     evenements = 'BEGIN:VCALENDAR\r\n';
//     evenements = evenements + 'PRODID:-GestionEquipeSportive v1.0\r\n';
//     evenements = evenements + 'VERSION:2.0\r\n';    
//     evenements = evenements + 'CALSCALE:GREGORIAN\r\n';
//     evenements = evenements + 'METHOD:PUBLISH\r\n';
//     // var UID = 0;

//     var dateTime = new Date();
//     var isoDate = dateTime.toISOString();
//     var dateTimeSansSymbols = retireSymbolsDesDate(isoDate);
//     var dateTimeStamp = dateTimeSansSymbols.substring(0, 15);
//     // console.log(event);

//     evenementsArray.forEach(element => {
//         evenements = evenements + 'BEGIN:VEVENT\r\n';
//         // UID++;
//         evenements = evenements + 'DTSTAMP:' + dateTimeStamp +  'Z\r\n';
//         evenements = evenements + 'DTSTART:' + retireSymbolsDesDate(element.dateDebut) + '\r\n';
//         evenements = evenements + 'DTEND:' + retireSymbolsDesDate(element.dateFin) + '\r\n';
//         evenements = evenements + 'UID:' + element.id+ '@gestionequipesportive.ca' + '\r\n';
//         evenements = evenements + 'SUMMARY:' + element.description + '\r\n';
//         evenements = evenements + 'LOCATION:' + element.emplacement + '\r\n';
//         evenements = evenements + 'END:VEVENT\r\n';
//     });
//     evenements = evenements + 'END:VCALENDAR\r\n';

//     console.log(evenements);

    var lienPourAbonnement = `/abonnement/${id}`;

    function downloadFichier(){
        const data = new Blob([evenements], { type: "text/plain;charset=utf-8" });
        console.log(data);
        const url = URL.createObjectURL(data);
        console.log(url);
        // csvURL = window.URL.createObjectURL(data),
        // tempLink = document.createElement('a');
        // tempLink.href = csvURL;
        // tempLink.setAttribute('download', 'calendrier.ics');
        return data;
    }
    // console.log(blob);
    // saveAs(blob, "event-schedule.ics");

    function retireSymbolsDesDate(dateAcorriger){
        var data = dateAcorriger.replace(/[-:]/g, '');
        return data;
    }

    return (
        <>{downloadFichier()}</>
    )
}