import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import MessagePageAccueil from './MessagePageAccueil';
import { PageAcceuilEntraineur } from '../pages/PageAccueilEntraineur';

export function Accueil() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated === true) {
    return (
      <>
        <PageAcceuilEntraineur/>
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
