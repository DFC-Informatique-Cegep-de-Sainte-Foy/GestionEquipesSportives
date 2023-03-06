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

        public Evenement ChercherEvenementParId(int id)
        {
            return _depotEvenement.ChercherEvenementParId(id);
        }

        public bool AjouterEvenement(Evenement evenement)
        {
            return _depotEvenement.AjouterEvenement(evenement);
        }
        
        public bool ModifierEvenement(Evenement evenement)
        {
           return _depotEvenement.ModifierEvenement(evenement);
        }

        public bool SupprimerEvenement(Evenement evenement)
        {
            return _depotEvenement.SupprimerEvenement(evenement);
        }
    }
}
