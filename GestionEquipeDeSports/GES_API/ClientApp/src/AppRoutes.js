import { Equipes } from "./components/Equipes";
import { Accueil } from "./components/Accueil";
import { Evenements } from "./components/Evenements";
import { Connexion } from "./components/Connexion";
import { FormEvenement } from "./components/FormulaireEvenement";
import { FormEquipe } from "./components/FormulaireEquipe";
import { Utilisateurs } from "./components/Utilisateurs";
import { FormEntraineur } from "./components/FormulaireEntraineur";
import { PageUnEvenement } from "./components/PageUnEvenement";
import { PageModifieUnEvenement } from "./components/PageModifieUnEvenement";
import { PageSupprimerEvenement } from "./components/PageSupprimerEvenement";
import { PageUneEquipe } from "./components/PageUneEquipe";
import { PageSupprimerEquipe } from "./components/PageSupprimerEquipe";
import { PageJoueur } from "./pages/PageJoueur";
import  Erreur404  from "./components/Erreur404";
import PageRejoindreUneEquipe from "./components/PageRejoindreUneEquipe";

const AppRoutes = [
  {
    index: true,
    element: <Accueil />
  },
  {
    path: '/equipes',
    element: <Equipes />
  },
  {
    path: '/evenements',
    element: <Evenements   />
  },
  {
    path: '/formulaireEvenement',
    element: <FormEvenement />
  },
  {
    path: '/formulaireEquipe',
    element: <FormEquipe />
  },
  {
    path: '/utilisateurs',
    element: <Utilisateurs />
  },
  {
    path: '/formulaireEntraineur',
    element: <FormEntraineur />
  },
  {
    path: '/connexion',
    element: <Connexion />
  },
  {
    path: '/unEvenement/:id',
    element: <PageUnEvenement />
  },
  {
    path: '/modifieEvenement/:id',
    element: <PageModifieUnEvenement />
  },
  {
    path: '/supprimerEvenement/:id',
    element: <PageSupprimerEvenement />
  },
  {
    path: '/uneEquipe/:id',
    element: <PageUneEquipe />
  },
  {
    path: '/supprimerEquipe/:id',
    element: <PageSupprimerEquipe />
  },
  {
    path: 'pagejoueur/:id',
    element: <PageJoueur />
  },
  {
    path: '/rejoindreUneEquipe',
    element: <PageRejoindreUneEquipe />
  },
  /*{
    path: '/incrireUneEquipe',
    element: <PageIncrireUneEquipe />
  },*/
  {
    path: '*',
    element: <Erreur404 />
  }
];

export default AppRoutes;
