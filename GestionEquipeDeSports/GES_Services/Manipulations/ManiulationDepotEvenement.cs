using GES_Services.Entites;
using GES_Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Manipulations
{
    public class ManiulationDepotEvenement
    {
        private IDepotEvenement _depotEvenement;

        public ManiulationDepotEvenement(IDepotEvenement depotEvenement)
        {
            _depotEvenement = depotEvenement;
        }
        
        public IEnumerable<Evenement> ListerEvenements()
        {
            return _depotEvenement.ListerEvenements();
        }

        public Evenement ChercherEvenementParId(Guid id)
        {
            return _depotEvenement.ChercherEvenementParId(id);
        }

        public void AjouterEvenement(Evenement evenement)
        {
            if (evenement is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(evenement));
            }
            _depotEvenement.AjouterEvenement(evenement);
        }
        
        public void ModifierEvenement(Evenement evenement)
        {
            if (evenement is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(evenement));
            }
            _depotEvenement.ModifierEvenement(evenement);
        }

        public void SupprimerEvenement(Evenement evenement)
        {
            if (evenement is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(evenement));
            }
            _depotEvenement.SupprimerEvenement(evenement);
        }
    }
}
