import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavItem, NavLink, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';

function AfficherPageEnFonctionDuRole({ estDansLaBD }) {
    const [roleDeLUtilisateur, setRoleDeLUtilisateur] = useState(-1);
    const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    async function fetchUtilisateur() {

        const token = await getAccessTokenSilently();

        await fetch(`api/utilisateur/${user.email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data) {
                    setRoleDeLUtilisateur(data.fkIdRoles);
                }
            }).catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (isAuthenticated && estDansLaBD) {
            fetchUtilisateur();
        }
    }, [isAuthenticated, estDansLaBD]);


    function MenuAAfficher() {
        console.log(isAuthenticated + "     ", isAuthenticated + "     ", roleDeLUtilisateur);
        if (isAuthenticated === true && estDansLaBD === true) {
            if (roleDeLUtilisateur === 0) {
                return (
                    <Nav>
                        <NavItem>
                            <NavLink tag={Link} className="text-white" to="/accueil">Accueil</NavLink>
                        </NavItem>

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
                            <NavLink tag={Link} className="text-white" to="/rejoindreUneEquipe">Rejoindre une équipe</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={Link} className="text-white" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Déconnexion</NavLink>
                        </NavItem>
                    </Nav>
                );
            }
            else {
                return (
                    <Nav>
                        <NavItem>
                            <NavLink tag={Link} className="text-white" to="/pageAccueil">Ma page d'accueil</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={Link} className="text-white" to="/rejoindreUneEquipe">Rejoindre une équipe</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={Link} className="text-white" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Déconnexion</NavLink>
                        </NavItem>
                    </Nav>
                );
            }
        }
        else {
            return (
                <Nav>
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