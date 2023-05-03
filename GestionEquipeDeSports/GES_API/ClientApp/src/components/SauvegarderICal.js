import React from "react";
import { saveAs } from 'file-saver';

export function SauvegarderICal(event) {
    var evenements;
    evenements = 'BEGIN:VCALENDAR\r\n';
    evenements = evenements + 'PRODID:-GestionEquipeSportive v1.0\r\n';
    evenements = evenements + 'VERSION:2.0\r\n';    
    evenements = evenements + 'CALSCALE:GREGORIAN\r\n';
    evenements = evenements + 'METHOD:PUBLISH\r\n';
    var UID = 0;

    // const newEvent = {
    //     BEGIN: 'VCALENDAR',
    //     VERSION: 2.0,
    //     PRODID: 'www.website.com',
    //     BEGIN: 'VEVENT',
    //     UID: 'info@website.com',
    //     CATEGORIES: 'APPOINTMENT',
    //     DTSTAMP: '19970610T172345Z',
    //     DTSTART: '20230321T153010Z',
    //     DTEND: '20230321T163010Z',
    //     SUMMARY: 'My great event',
    //     END: 'VEVENT',
    //     LOCATION: 'Location',
    //     DESCRIPTION: 'Great event in your town',
    //     END: 'VCALENDAR',
    // }
    var dateTime = new Date();
    var isoDate = dateTime.toISOString();
    var dateTimeSansSymbols = retireSymbolsDesDate(isoDate);
    var dateTimeStamp = dateTimeSansSymbols.substring(0, 15);

    event.forEach(element => {
        evenements = evenements + 'BEGIN:VEVENT\r\n';
        UID++;
        evenements = evenements + 'DTSTAMP:' + dateTimeStamp +  'Z\r\n';
        evenements = evenements + 'DTSTART:' + retireSymbolsDesDate(element.dateDebut) + '\r\n';
        evenements = evenements + 'DTEND:' + retireSymbolsDesDate(element.dateFin) + '\r\n';
        evenements = evenements + 'UID:' + element.dateDebut + UID + '@gestionequipesportive.ca' + '\r\n';
        evenements = evenements + 'SUMMARY:' + element.description + '\r\n';
        evenements = evenements + 'LOCATION:' + element.emplacement + '\r\n';
        evenements = evenements + 'END:VEVENT\r\n';
    });
    evenements = evenements + 'END:VCALENDAR\r\n';

    console.log(evenements);

    const blob = new Blob([evenements], { type: "text/plain;charset=utf-8" });
    console.log(blob);
    saveAs(blob, "event-schedule.ics");

    function retireSymbolsDesDate(dateAcorriger){
        var data = dateAcorriger.replace(/[-:]/g, '');
        return data;
    }

    return (
        <></>
    )
}
