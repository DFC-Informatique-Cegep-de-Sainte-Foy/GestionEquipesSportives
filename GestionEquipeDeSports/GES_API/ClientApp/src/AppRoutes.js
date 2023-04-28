import Equipes from "./components/Equipes";
import { Accueil } from "./components/Accueil";
import Evenements from "./components/Evenements";
import { FormEvenement } from "./components/FormulaireEvenement";
import { FormEquipe } from "./components/FormulaireEquipe";
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
import PageUneEquipePourUnAthlete from "./pages/PageUneEquipePourUnAthlete";
import PageUneEquipePourUnEntraineur from "./pages/PageUneEquipePourUnEntraineur";

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
    //element: <Evenements />
    element: <AuthenticationGuard component={Evenements} />
  },
  {
    path: '/formulaireEvenement',
    //element: <FormEvenement />
    element: <AuthenticationGuard component={FormEvenement} />
  },
  {
    path: '/formulaireEquipe',
    //element: <FormEquipe />
    element: <AuthenticationGuard component={FormEquipe} />
  },
  {
    path: '/utilisateurs',
    //element: <Utilisateurs />
    element: <AuthenticationGuard component={Utilisateurs} />
  },
  {
    path: '/formulaireEntraineur',
    //element: <FormEntraineur />
    element: <AuthenticationGuard component={FormEntraineur} />
  },
  {
    path: '/connexion',
    element: <Connexion />
  },
  {
    path: '/unEvenement/:id',
    //element: <PageUnEvenement />
    element: <AuthenticationGuard component={PageUnEvenement} />
  },
  {
    path: '/modifieEvenement/:id',
    //element: <PageModifieUnEvenement />
    element: <AuthenticationGuard component={PageModifieUnEvenement} />
  },
  {
    path: '/supprimerEvenement/:id',
    //element: <PageSupprimerEvenement />
    element: <AuthenticationGuard component={PageSupprimerEvenement} />
  },
  {
    path: '/uneEquipe/:id',
    //element: <PageUneEquipe />
    element: <AuthenticationGuard component={PageUneEquipe} />
  },
  {
    path: '/supprimerEquipe/:id',
    element: <PageSupprimerEquipe />
  },
  {
    // path: '/ma-page-accueil/:id',
    path: 'ma-page-accueil/',
    //element: <PageJoueur />
    element: <AuthenticationGuard component={PageAccueilAthlete} />
  },
  {
    path: '/accueilEntraineur',
    //element: <PageAcceuilEntraineur />
    element: <AuthenticationGuard component={PageAcceuilEntraineur} />
  },
  {
    path: '/rejoindreUneEquipe',
    //element: <PageRejoindreUneEquipe />
    element: <AuthenticationGuard component={PageRejoindreUneEquipe} />
  },
  {
    path: '/profile',
    //element: <Profile />
    element: <AuthenticationGuard component={Profile} />
  },
  {
    path: '/pageUneEquipePourUnAthlete',
    //element: <Profile />
    element: <AuthenticationGuard component={PageUneEquipePourUnAthlete} />
  },
  {
    path: '/pageUneEquipePourUnEntraineur',
    //element: <Profile />
    element: <AuthenticationGuard component={PageUneEquipePourUnEntraineur} />
  },
  {
    path: '*',
    element: <Erreur404 />
  }
];

export default AppRoutes;
