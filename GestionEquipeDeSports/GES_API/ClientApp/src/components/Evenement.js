import React, { useEffect, useState, useContext } from "react";
import { BiCheck, BiX } from "react-icons/bi";
import { Button } from "react-bootstrap";
import { FormatDateTime } from "./FormatDateTime";
import { CalculerDuree } from "./CalculerDuree";
import { useAuth0 } from '@auth0/auth0-react';
import { IdUtilisateurContext } from "./Context";

export const Evenement = (props) =>{
    const [joueurPresenceEvenement, setJoueurPresenceEvenement] = useState([]);
    const [idUtilisateur, setIdUtilisateur] = useState('');
    const { getAccessTokenSilently } = useAuth0();
    const idUt = useContext(IdUtilisateurContext);

    useEffect(() => {
        listePresenceJoueurPourEvenement(idUt);
    }, []);

    async function listePresenceJoueurPourEvenement(id){
        const token =  await getAccessTokenSilently();
        console.log(id);
        await fetch(`api/evenementJoueur/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then((result) => {
            console.log('Liste presence equipeJoueurs');
            console.log(result);
            if(result.status === 404){
                console.log(' status 404, rien trouvee ');
            }else
            {
                setJoueurPresenceEvenement(result);
            }
        });
    }

    function afficherEtatPresence(idEvenement){
        console.log(idEvenement);
        let etatAReturn;
        if(joueurPresenceEvenement.length !== 0)
        {
            for(let i = 0; i < joueurPresenceEvenement.length; i++){
                const ev = joueurPresenceEvenement[i];
                if(ev.fk_Id_Evenement === idEvenement){
                    if(ev.estPresentAevenement === true)
                    {
                        console.log('Est present');
                        etatAReturn = <td style={{color: "green"}}>PRESENT</td>
                        break;
                    }
                    else
                    {
                        console.log('est absent !!!');
                        etatAReturn = <td style={{color: "red"}}>absent</td>
                        break;
                    }
                }
                else{
                    console.log('1 if');
                    etatAReturn = <td style={{color: "grey"}}>inconnu</td>
                }
            }
        }else{
            console.log('2 if');
            etatAReturn = <td style={{color: "grey"}}>inconnu</td>
        }
        return etatAReturn;
    }

    async function changerEtatPresence(id, etat){
        console.log(idUt);
        console.log(etat);
        const token =  await getAccessTokenSilently();

        let requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                FK_Id_Utilisateur: idUt,
                FK_Id_Evenement: id,
                EstPresentAEvenement: etat
            })
        };

        await fetch(`api/evenementJoueur`, requestOptions)
        .then(function (reponse) {
            console.log(reponse);

        }).catch(function (error) {
            console.log(error)
        })
    }

    // console.log('Evenement :');
    // console.log(props);
    return(
        <tr>            
            <td>{props.num}</td>
            <td>{props.description}</td>
            <td>{props.emplacement}</td>
            <FormatDateTime doneesDateTime={props.dateDebut} />
            <CalculerDuree dateACalculer={[props.dateDebut, props.dateFin]} />
            <td>{afficherEtatPresence(props.id)}</td>
            <td>
                <Button variant='success' onClick={() => changerEtatPresence(props.id, true)} size="sm" className="me-2" title="Est présent"> <BiCheck /></Button>
                <Button variant='warning' onClick={() => changerEtatPresence(props.id, false)} size="sm" className="me-2" title="Est absent"> <BiX /></Button>
            </td>
        </tr>
    )
}
