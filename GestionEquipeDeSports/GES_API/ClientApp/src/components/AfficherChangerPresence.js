import React, { useState } from "react";

export const AfficherChangerPresence = (props) => {
    const[presence, setPresence] = useState('');
    const idEv = props.presence[0];
    var joueurPresenceEvenement = props.presence[1];

    function afficherEtatPresence(){
        let etatAReturn;
        if(joueurPresenceEvenement.length !== 0)
        {
            for(let i = 0; i < joueurPresenceEvenement.length; i++){
                const ev = joueurPresenceEvenement[i];
                if(ev.fk_Id_Evenement === idEv){
                    if(ev.estPresentAevenement === true)
                    {
                        etatAReturn = <td style={{color: "green"}}>PRESENT</td>
                        break;
                    }
                    else
                    {
                        etatAReturn = <td style={{color: "red"}}>absent</td>
                        break;
                    }
                }
                else{
                    etatAReturn = <td style={{color: "grey"}}>inconnu</td>
                }
            }
        }else{
            etatAReturn = <td style={{color: "grey"}}>inconnu</td>
        }
        return etatAReturn;
    }

    return (
        <td>{afficherEtatPresence()}</td>
    )
}