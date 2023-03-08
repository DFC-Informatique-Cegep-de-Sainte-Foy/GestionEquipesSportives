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
        public IEnumerable<Equipe> ListerEquipes();
        public Equipe ChercherEquipeParId(int id);
        public void AjouterEquipe(Equipe equipe);
        public void ModifierEquipe(Equipe equipe);
        public void SupprimerEquipe(Equipe equipe);
    }
}
