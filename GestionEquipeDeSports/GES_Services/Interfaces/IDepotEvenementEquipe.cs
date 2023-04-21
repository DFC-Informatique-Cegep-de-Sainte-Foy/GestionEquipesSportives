
using GES_Services.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Interfaces
{
    public interface IDepotEvenementEquipe
    {
        public IEnumerable<Equipe> ListerEvenementEquipe(Guid p_id);
        public void AjouterEquipeDansEvenement(EquipeEvenement p_evenementEquipe);
        public EquipeEvenement ChercherEquipeDansEquipeEvenement(EquipeEvenement p_equipeEvenement);
        public void SupprimerEvenementEquipe(EquipeEvenement p_equipeEvenement);
    }
}
