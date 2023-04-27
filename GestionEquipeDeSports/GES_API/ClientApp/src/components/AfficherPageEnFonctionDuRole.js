import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
//import { NavItem, NavLink, Nav } from 'reactstrap';
//import { Link } from 'react-router-dom';


function AfficherPageEnFonctionDuRole(){

    const [tableauDesroles, setTableauDesroles] = useState([]);
    const { loginWithRedirect, logout,user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    async function getRoles(email){
        const token = await getAccessTokenSilently();

        const resultat = await fetch(`api/UtilisateurEquipeRole/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });

        const body = await resultat.json();
        console.log(body);

        return body;
    }

    useEffect( () => { 
        async function getLesRolesDeLUtilisateurConnecte() {
            try {
                console.log(user);
            
                const roleDeLUtilisateur = await getRoles(user.email); 
                console.log(roleDeLUtilisateur);
            } 
            catch (err) 
            {
                console.log("ERREUR:" +err);
            }
        }
        getLesRolesDeLUtilisateurConnecte();
    }, []);


    function MenuAAfficher(){
        if (isAuthenticated === true)
        {
            
        }
    }

    return(
        <>
            
        </>
    );

}

export default AfficherPageEnFonctionDuRole;