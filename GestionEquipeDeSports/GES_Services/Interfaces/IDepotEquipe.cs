using GES_Services.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Interfaces
{
    public interface IDepotEquipe
    {
        public IEnumerable<Equipe> ListerEquipe();
        public Equipe ChercherEquipeParId(int id);
        public bool AjouterEquipe(Equipe equipe);
        public bool ModifierEquipe(Equipe equipe);
        public bool SupprimerEquipe(Equipe equipe);
    }
}
