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
import { PageAcceuilEntraineur } from "./pages/PageAccueilEntraineur";
import Erreur404 from "./components/Erreur404";
import PageRejoindreUneEquipe from "./pages/PageRejoindreUneEquipe";
import Profile from "./components/Profile";
import { Connexion } from "./components/Connexion";
import { AuthenticationGuard } from "./components/AuthenticationGuard";
import PageUneEquipePourUnEntraineur from "./pages/PageUneEquipePourUnEntraineur";
import { PageFormEquipe } from "./pages/PageFormulaireEquipe";
import PageInviterOuAjouterJoueur from "./pages/PageInviterOuAjouterJoueur";
import PagePourSaisirLeCourrielDInvitation from "./pages/PagePourSaisirLeCourrielDInvitation";
import PageInscription from "./pages/PageInscription";
import { PageAjouterEvenementsCoup } from "./pages/PageAjouterEvenementsCoup";

const AppRoutes = [
  {
    index: true,
    element: <Accueil />
  },
  {
    path: '/connexion',
    element: <Connexion />
  },
  {
    path: '/inscription',
    element: <PageInscription />
  },
  {
    path: '/pageAccueil',
    element: <AuthenticationGuard component={PageAcceuilEntraineur} />
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
    path: '/formulaireEvenement',
    element: <AuthenticationGuard component={FormEvenement} />
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
    element: <AuthenticationGuard component={PageSupprimerEquipe} />
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
    path: '/saisirEtEnvoyerInvitation/:id',
    element: <AuthenticationGuard component={PagePourSaisirLeCourrielDInvitation} />
  },
  {
    path: '/ajouterEvenementsCoup/:id',
    element: <AuthenticationGuard component={PageAjouterEvenementsCoup} />
  },
  {
    path: '*',
    element: <Erreur404 />
  }
];

export default AppRoutes;
