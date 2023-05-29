import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import MessagePageAccueil from './MessagePageAccueil';
import { PageAcceuilEntraineur } from '../pages/PageAccueilEntraineur';
import PageInscription from '../pages/PageInscription';

export function Accueil() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [userEstDansLaBD, setUserEstDansLaBD] = useState(false);
  const [utilisateur, setUtilisateur] = useState(null);
  const navigate = useNavigate();

  async function getUtilisateur() {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();

      await fetch(`api/utilisateur/${user.name}`, {
        headers: {
          Accept: "application/json", Authorization: `Bearer ${token}`
        },
      }).then(response => {
        if (response.status === 404) {
          setUserEstDansLaBD(false);
        } else if (response.ok) {
          return response.json();
        }
        throw new Error('Response status not OK');
      }).then(data => {
        if (data) {
          setUtilisateur(data);
          setUserEstDansLaBD(true);
        }
      }).catch(err => {
        console.error(err);
        setUserEstDansLaBD(false);
      });
    } else {
      setUserEstDansLaBD(false);
      setUtilisateur(null);
    }
  }

  useEffect(() => {
    if (isAuthenticated && userEstDansLaBD) {
      navigate("/PageAccueil");
    }
  }, [isAuthenticated, userEstDansLaBD]);

  useEffect(() => {
    getUtilisateur();
  }, [isAuthenticated, userEstDansLaBD]);


  // if (isAuthenticated === true && userEstDansLaBD === true) {
  //   console.log("Accueil.js: userEstDansLaBD === true et isAuthenticated === true");
  //   return (
  //     <>
  //       <PageAcceuilEntraineur />
  //     </>
  //   );
  // }
  // else 
  
  if (isAuthenticated === true && userEstDansLaBD === false) {
    return (
      <>
        <PageInscription />
      </>
    );
  }
  else {
    return (
      <>
        <MessagePageAccueil />
      </>
    );
  }
}
