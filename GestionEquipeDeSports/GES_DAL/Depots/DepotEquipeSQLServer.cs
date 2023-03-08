using GES_Services.Interfaces;
/*using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;*/

namespace GES_DAL.Depots
{
    class DepotEquipeSQLServer : IDepotEquipe
    {
        private GestionEquipeContextSQLServer m_context;

        public DepotEquipeSQLServer(GestionEquipeContextSQLServer p_context)
        {
            if(p_context is null)
            {
                throw new ArgumentNullException(nameof(p_context));
            }

            this.m_context = p_context;
        }

        public IEnumerable<Equipe> ListerEquipes()
        {

        }
        public Equipe ChercherEquipeParId(int id)
        {

        }
        public bool AjouterEquipe(Equipe equipe)
        {

        }
        public bool ModifierEquipe(Equipe equipe)
        {

        }
        public bool SupprimerEquipe(Equipe equipe)
        {

        }
    }
}
