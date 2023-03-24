import { Equipes } from "./components/Equipes";
import { Accueil } from "./components/Accueil";
import { Evenements } from "./components/Evenements";
import { Connexion } from "./components/Connexion";
import { FormEvenement } from "./components/FormulaireEvenement";
import { FormEquipe } from "./components/FormulaireEquipe";
import { Entraineurs } from "./components/Entraineurs";
import { FormEntraineur } from "./components/FormulaireEntraineur";
import { PageUnEvenement } from "./components/PageUnEvenement";

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
    path: '/entraineurs',
    element: <Entraineurs />
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
  }
];

export default AppRoutes;
