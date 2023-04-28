import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import UtilisateurConnecteHeader from './UtilisateurConnecteHeader';
import MessagePageAccueil from './MessagePageAccueil';

export function Accueil() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated === true) {
    return (
      <>
        <UtilisateurConnecteHeader />
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
