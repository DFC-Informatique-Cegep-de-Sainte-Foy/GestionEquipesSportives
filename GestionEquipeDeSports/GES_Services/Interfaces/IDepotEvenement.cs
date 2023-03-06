using GES_Services.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Interfaces
{
    public interface IDepotEvenement
    {
        public bool AjouterEvenement(Evenement evenement);
        public bool ModifierEvenement(Evenement evenement);
        public bool SupprimerEvenement(Evenement evenement);
        public Evenement ChercherEvenementParId(int id);
    }
}
