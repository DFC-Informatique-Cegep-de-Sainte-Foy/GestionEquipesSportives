using GES_Services.Interfaces;
using GES_Services.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Manipulations
{
    public class ManipulationDepotEquipe
    {
        private IDepotEquipe m_depotEquipe;
        public ManipulationDepotEquipe(IDepotEquipe p_depotEquipe)
        {
            this.m_depotEquipe = p_depotEquipe;
        }

        public IEnumerable<Equipe> ListerEquipe()
        {
            return this.m_depotEquipe.ListerEquipe();
        }
        public Equipe ChercherEquipeParId(int p_id)
        {
            return this.m_depotEquipe.ChercherEquipeParId(p_id);
        }
        public bool AjouterEquipe(Equipe p_equipe)
        {
            return this.m_depotEquipe.AjouterEquipe(p_equipe);
        }
        public bool ModifierEquipe(Equipe p_equipe)
        {
            return this.m_depotEquipe.ModifierEquipe(p_equipe);
        }
        public bool SupprimerEquipe(Equipe p_equipe)
        {
            return this.m_depotEquipe.SupprimerEquipe(p_equipe);
        }
    }
}
