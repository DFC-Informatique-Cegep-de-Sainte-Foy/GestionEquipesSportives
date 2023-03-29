using GES_Services.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Interfaces
{
    public interface IDepotEquipeEvenement
    {
        public IEnumerable<Evenement> ListerEquipeEvenements(Guid p_id);
        public EquipeEvenement ChercherEquipeEvenemntParId(Guid p_id);
        public void AjouterEquipeEvenement(EquipeEvenement p_equipeEvenement);
        public void ModifierEquipeEvenement(EquipeEvenement p_equipeEvenement);
        public void SupprimerEquipeEvenement(EquipeEvenement p_equipeEvenement);
    }
}
