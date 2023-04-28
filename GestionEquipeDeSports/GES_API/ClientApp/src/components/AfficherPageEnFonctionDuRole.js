import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavItem, NavLink, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';


function AfficherPageEnFonctionDuRole() {
    const [tableauDesroles, setTableauDesroles] = useState([]);
    const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const rolesVenantDuBackend = [];

    async function getRolesVenantDuBackend(email) {
        const token = await getAccessTokenSilently();

        const resultat = await fetch(`api/UtilisateurEquipeRole/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });

        const body = await resultat.json();
        console.log(body);

        body.forEach((data) => {
            rolesVenantDuBackend.push(data.fkIdRole);
            //console.log(data.fkIdRole);
        })

        return rolesVenantDuBackend;
    }

    useEffect(() => {
        async function getLesRolesDeLUtilisateurConnecte() {
            try {
                console.log(user);

                const roles = await getRolesVenantDuBackend(user.email);
                //console.log(roles);
                setTableauDesroles(roles);
            }
            catch (err) {
                console.log(err);
            }
        }
        getLesRolesDeLUtilisateurConnecte();
    }, []);


    function MenuAAfficher() {
        if (isAuthenticated === true) {
            console.log(tableauDesroles);

            tableauDesroles.forEach((role) => {
                console.log(role);

                if (role === 0) {
                    console.log("C'est 0");
                    return (
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
                else if (role === 1) {
                    console.log("C'est 1");
                    return (
                        <Nav>
                            <NavItem>
                                <NavLink tag={Link} className="text-white" to="/accueilEntraineur">Page d'accueil Entraineur</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={Link} className="text-white" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Déconnexion</NavLink>
                            </NavItem>
                        </Nav>
                    );
                }
                else {
                    console.log("C'est 2 ou 3");
                    return (
                        <Nav>
                            <NavItem>
                                <NavLink tag={Link} className="text-white" to="/ma-page-accueil">Ma page d'Accueil</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={Link} className="text-white" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Déconnexion</NavLink>
                            </NavItem>
                        </Nav>
                    );
                }

            })
        }
        else {
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