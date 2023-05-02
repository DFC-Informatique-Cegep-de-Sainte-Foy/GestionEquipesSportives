import React from "react";
import { saveAs } from 'file-saver';

export function SauvegarderICal (event) {
    var evenements;
    evenements = 'BEGIN:VCALENDAR\n';
    evenements = evenements + 'VERSION:2.0\n';
    evenements = evenements + 'PRODID:GestionEquipeSportive\n';
    var UID = 0;
    console.log('evenements : ');
    console.log(evenements);
    console.log('event :');
    console.log(event);

    // const newEvent = {
    //     BEGIN: 'VCALENDAR',
    //     VERSION: 2.0,
    //     PRODID: 'www.website.com',
    //     BEGIN: 'VEVENT',
    //     UID: 'info@website.com',
    //     // CATEGORIES: 'APPOINTMENT',
    //     DTSTAMP: '19970610T172345Z',
    //     DTSTART: '20230321T153010Z',
    //     DTEND: '20230321T163010Z',
    //     SUMMARY: 'My great event',
    //     END: 'VEVENT',
    //     LOCATION: 'Location',
    //     //DESCRIPTION: 'Great event in your town',
    //     END: 'VCALENDAR',
    // }
    // console.log(newEvent);

    console.log('forEach');
    event.forEach(element => {
                // const newEvent = [];
                evenements = evenements + 'BEGIN:VEVENT\n' ;
                UID++;
                evenements = evenements + 'UID:' + UID + '\n';
                evenements = evenements + 'DTSTAMP:19970610T172345Z\n';
                evenements = evenements + 'DTSTART:' + element.dateDebut + '\n';
                // console.log(element.dateDebut);
                evenements = evenements + 'DTEND:' + element.dateFin + '\n';
                evenements = evenements + 'SUMMARY:' + element.description + '\n';
                evenements = evenements + 'LOCATION:' + element.emplacement + '\n';
                evenements = evenements + 'END:VEVENT\n';
    });
    evenements = evenements + 'END:VCALENDAR\n';

    console.log(evenements);

    const blob = new Blob([evenements], { type: "text/plain;charset=utf-8" });
    console.log(blob);
    saveAs(blob, "event-schedule.ics");

    // const handleSauvegarde = () => {
        // creerEvent (newEvent, (error, value) => {
        //     if(error){
        //         console.log(error);
        //     }
        //     const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
        //     saveAs(blob, "event-schedule.ics");
        // });
    // };
    return (
        <></>
    )
}
