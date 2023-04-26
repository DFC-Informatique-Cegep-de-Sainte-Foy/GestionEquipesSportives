import React from "react";
import { BiCheck, BiX } from "react-icons/bi";
import { Button } from "react-bootstrap";
import { FormatDateTime } from "./FormatDateTime";
import { CalculerDuree } from "./CalculerDuree";

export const Evenement = (props) =>{
    console.log('Evenement :');
    console.log(props);
    return(
        <tr>            
            <td>{props.num}</td>
            <td>{props.description}</td>
            <td>{props.emplacement}</td>
            <FormatDateTime doneesDateTime={props.dateDebut} />
            <CalculerDuree dateACalculer={[props.dateDebut, props.dateFin]} />
            <td>Présence sera ici</td>
            <td>
                <Button variant='success' size="sm" className="me-2" title="Est présent"> <BiCheck /></Button>
                <Button variant='warning' size="sm" className="me-2" title="Est absent"> <BiX /></Button>
            </td>
        </tr>
    )
}
