import { Equipes } from "./components/Equipes";
import { Accueil } from "./components/Accueil";
import { Evenements } from "./components/Evenements";
import { Connexion } from "./components/Connexion";
import { FormEvenement } from "./components/FormulaireEvenement";
import { FormEquipe } from "./components/FormulaireEquipe";
import { Entraineur } from "./components/Entraineur";

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
    path: '/entraineur',
    element: <Entraineur />
  },
  {
    path: '/connexion',
    element: <Connexion />
  }
];

export default AppRoutes;
