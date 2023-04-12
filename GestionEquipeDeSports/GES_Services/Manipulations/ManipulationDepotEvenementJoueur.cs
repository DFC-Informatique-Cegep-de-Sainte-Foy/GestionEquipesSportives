using GES_Services.Entites;
using GES_Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Manipulations
{
    public class ManipulationDepotEvenementJoueur
    {
        private IDepotEvenementJoueur m_depotEvenementJoueur;

        public ManipulationDepotEvenementJoueur(IDepotEvenementJoueur p_depotEvenementJoueur)
        {
            if(p_depotEvenementJoueur == null)
            {
                throw new ArgumentNullException(nameof(p_depotEvenementJoueur));
            }
            this.m_depotEvenementJoueur = p_depotEvenementJoueur;
        }
        
        public EvenementJoueur ChercherJoueurParIdEvenementIdJoueur(EvenementJoueur p_evenementJoueur)
        {
            if(p_evenementJoueur is null)
            {
                throw new ArgumentNullException(nameof(p_evenementJoueur));
            }
            return this.m_depotEvenementJoueur.ChercherJoueurParIdEvenementIdJoueur(p_evenementJoueur);
        }
        
        public IEnumerable<EvenementJoueur> ChercherJoueurParIdEvenement(Guid p_id)
        {
            throw new NotImplementedException();
        }
        
        public void AjouterPresencePourJoueur(EvenementJoueur p_evenementJoueur)
        {
            if (p_evenementJoueur is null)
            {
                throw new ArgumentNullException(nameof(p_evenementJoueur));
            }
            this.m_depotEvenementJoueur.AjouterPresencePourJoueur(p_evenementJoueur);
        }
    }
}
