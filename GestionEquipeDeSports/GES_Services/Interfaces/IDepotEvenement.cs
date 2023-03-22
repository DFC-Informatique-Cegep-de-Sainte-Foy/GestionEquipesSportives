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
        public void AjouterEvenement(Evenement evenement);
        public void ModifierEvenement(Evenement evenement);
        public void SupprimerEvenement(Evenement evenement);
        public Evenement ChercherEvenementParId(Guid id);
        public IEnumerable<Evenement> ListerEvenements();
    }
}
