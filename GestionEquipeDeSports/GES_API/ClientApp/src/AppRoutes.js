import Equipes from "./components/Equipes";
import { Accueil } from "./components/Accueil";
import Evenements from "./components/Evenements";
import { FormEvenement } from "./pages/PageFormulaireEvenement";
import Utilisateurs from "./components/Utilisateurs";
import FormEntraineur from "./components/FormulaireEntraineur";
import { PageUnEvenement } from "./pages/PageUnEvenement";
import { PageModifieUnEvenement } from "./components/PageModifieUnEvenement";
import { PageSupprimerEvenement } from "./components/PageSupprimerEvenement";
import { PageUneEquipe } from "./components/PageUneEquipe";
import { PageSupprimerEquipe } from "./components/PageSupprimerEquipe";
import { PageAccueilAthlete } from "./pages/PageJoueur";
import { PageAcceuilEntraineur } from "./pages/PageAccueilEntraineur";
import Erreur404 from "./components/Erreur404";
import PageRejoindreUneEquipe from "./components/PageRejoindreUneEquipe";
import Profile from "./components/Profile";
import { Connexion } from "./components/Connexion";
import { AuthenticationGuard } from "./components/AuthenticationGuard";
import PageUneEquipePourUnEntraineur from "./pages/PageUneEquipePourUnEntraineur";
import { PageFormEquipe } from "./pages/PageFormulaireEquipe";

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
    path: '/formulaireEntraineur',
    element: <AuthenticationGuard component={FormEntraineur} />
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
    element: <AuthenticationGuard component={PageUneEquipe} />
  },
  {
    path: '/supprimerEquipe/:id',
    element: <PageSupprimerEquipe />
  },
  {
    // path: '/ma-page-accueil/:id',
    path: 'ma-page-accueil/',
    element: <AuthenticationGuard component={PageAccueilAthlete} />
  },
  {
    path: '/accueilEntraineur',
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
    path: '*',
    element: <Erreur404 />
  }
];

export default AppRoutes;
