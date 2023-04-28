import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavItem, NavLink, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';

function AfficherPageEnFonctionDuRole(){
    const [roleDeLUtilisateur, setRoleDeLUtilisateur] = useState([]);
    const { loginWithRedirect, logout,user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    async function getRoleVenantDuBackend(email) {
        const token = await getAccessTokenSilently();

        const resultat = await fetch(`api/utilisateur/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });

        const body = await resultat.json();
        console.log(body);

        const roleDeLUtilisateur = await body.roles;
        console.log(roleDeLUtilisateur);

        return roleDeLUtilisateur;
    }

    useEffect(() => {
        async function getLeRoleDeLUtilisateurConnecte() {
            try {
                console.log(user);

                const role = await getRoleVenantDuBackend(user.email);
                //console.log(role);
                setRoleDeLUtilisateur(role);
            }
            catch (err) {
                console.log(err);
            }
        }
        getLeRoleDeLUtilisateurConnecte();
    }, []);


        
    function MenuAAfficher()
    {
        if (isAuthenticated === true)
        {
            //console.log(roleDeLUtilisateur);
            
            if(roleDeLUtilisateur === 0)
            {
                return(
                    <Nav>
                        <NavItem>
                            <NavLink tag={Link} className="text-white" to="/evenements">Événements</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={Link} className="text-white" to="/equipes">Équipes</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={Link} className="text-white" to="/utilisateurs">Utilisateurs</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={Link} className="text-white" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Déconnexion</NavLink>
                        </NavItem>
                    </Nav>
                );
            }
            else 
            {
                return(
                    <Nav>
                        <NavItem>
                            <NavLink tag={Link} className="text-white" to="/accueilEntraineur">Page d'accueil</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={Link} className="text-white" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Déconnexion</NavLink>
                        </NavItem>
                    </Nav>
                );
            }
        }
        else
        {
            return (
                <Nav>
                  <NavItem>
                    <NavLink tag={Link} className="text-white" to="/">Accueil</NavLink>
                  </NavItem>
      
                  <NavItem>
                    <NavLink tag={Link} className="text-white" onClick={() => loginWithRedirect()}>Connexion</NavLink>
                  </NavItem>
      
                  <NavItem className="border border-success rounded">
                    <NavLink tag={Link} className="text-white" onClick={() => loginWithRedirect({
                      authorizationParams: {
                        screen_hint: "signup",
                      },
                    })}>
                      <span className='text-success'>Inscription</span>
                    </NavLink>
                  </NavItem>
                </Nav>
            );
        }
    }

    return (
        <>
            <MenuAAfficher />
        </>
    );

}

export default AfficherPageEnFonctionDuRole;