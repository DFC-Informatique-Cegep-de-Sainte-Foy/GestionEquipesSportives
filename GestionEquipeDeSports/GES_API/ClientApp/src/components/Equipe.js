import React from "react";
import { useNavigate } from "react-router-dom";

export const Equipe = (props) => {
    const navigate = useNavigate();
    // console.log(props.idEquipe);
    function MouseOver(event) {
        event.target.style.background = 'grey';
    }
    function MouseOut(event){
        event.target.style.background="";
    }

    return (
        <tr onClick={() => navigate(`/uneEquipe/${props.idEquipe}`)} style={{cursor: "pointer"}} onMouseOver={MouseOver} onMouseOut={MouseOut}>
            <td>{props.num}</td>
            <td>{props.nom}</td>
            <td>{props.region}</td>
            <td>{props.sport}</td>
            <td>{props.asportive}</td>
        </tr>
    )
}
