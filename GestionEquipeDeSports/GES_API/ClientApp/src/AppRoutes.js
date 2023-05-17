import Equipes from "./components/Equipes";
import { Accueil } from "./components/Accueil";
import Evenements from "./pages/PageEvenements";
import { FormEvenement } from "./pages/PageFormulaireEvenement";
import Utilisateurs from "./pages/PageUtilisateurs";
import { FormUtilisateur } from "./pages/PageFormulaireUtilisateur";
import { PageUnEvenement } from "./pages/PageUnEvenement";
import { PageModifieUnEvenement } from "./pages/PageModifieUnEvenement";
import { PageSupprimerEvenement } from "./pages/PageSupprimerEvenement";
import { PageUneEquipePourLAdmin } from "./pages/PageUneEquipePourLAdmin";
import { PageSupprimerEquipe } from "./pages/PageSupprimerEquipe";
import {  PageDesEvenementsEtEquipesDUnAthlete } from "./pages/PageDesEvenementsEtEquipesDUnAthlete";
import { PageAcceuilEntraineur } from "./pages/PageAccueilEntraineur";
import Erreur404 from "./components/Erreur404";
import PageRejoindreUneEquipe from "./pages/PageRejoindreUneEquipe";
import Profile from "./components/Profile";
import { Connexion } from "./components/Connexion";
import { AuthenticationGuard } from "./components/AuthenticationGuard";
import PageUneEquipePourUnEntraineur from "./pages/PageUneEquipePourUnEntraineur";
import { PageFormEquipe } from "./pages/PageFormulaireEquipe";
import PageInviterOuAjouterJoueur from "./pages/PageInviterOuAjouterJoueur";

const AppRoutes = [
  {
    index: true,
    element: <Accueil />
  },
  {
    path: '/equipes',
    element: <AuthenticationGuard component={Equipes} />
  },
  {
    path: '/evenements',
    element: <AuthenticationGuard component={Evenements} />
  },
  {
    path: '/formulaireEvenement/:id',
    element: <AuthenticationGuard component={FormEvenement} />
  },
  {
    path: '/formulaireEquipe',
    element: <AuthenticationGuard component={PageFormEquipe} />
  },
  {
    path: '/utilisateurs',
    element: <AuthenticationGuard component={Utilisateurs} />
  },
  {
    path: '/formulaireUtilisateur/:id',
    element: <AuthenticationGuard component={FormUtilisateur} />
  },
  {
    path: '/connexion',
    element: <Connexion />
  },
  {
    path: '/unEvenement/:id',
    element: <AuthenticationGuard component={PageUnEvenement} />
  },
  {
    path: '/modifieEvenement/:id',
    element: <AuthenticationGuard component={PageModifieUnEvenement} />
  },
  {
    path: '/supprimerEvenement/:id',
    element: <AuthenticationGuard component={PageSupprimerEvenement} />
  },
  {
    path: '/uneEquipe/:id',
    element: <AuthenticationGuard component={PageUneEquipePourUnEntraineur} />
  },
  {
    path: '/supprimerEquipe/:id',
    element: <PageSupprimerEquipe />
  },
  {
    path: 'pageDesEvenementsEtEquipesDUnAthlete/:id',
    element: <AuthenticationGuard component={PageDesEvenementsEtEquipesDUnAthlete} />
  },
  /*{
    // path: '/ma-page-accueil/:id',
    path: 'ma-page-accueil/',
    element: <AuthenticationGuard component={PageAccueilAthlete} />
  },*/
  {
    path: '/accueil',
    element: <AuthenticationGuard component={PageAcceuilEntraineur} />
  },
  {
    path: '/rejoindreUneEquipe',
    element: <AuthenticationGuard component={PageRejoindreUneEquipe} />
  },
  {
    path: '/profile',
    element: <AuthenticationGuard component={Profile} />
  },
  {
    path: '/pageUneEquipePourUnEntraineur/:id',
    element: <AuthenticationGuard component={PageUneEquipePourUnEntraineur} />
  },
  {
    path: '/inviterOuAjouterJoueur/:id',
    element: <AuthenticationGuard component={PageInviterOuAjouterJoueur} />
  },
  {
    path: '*',
    element: <Erreur404 />
  }
];

export default AppRoutes;
