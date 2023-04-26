using GES_Services.Entites;
using GES_Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Manipulations
{
    public class ManipulationDepotUtilisateurEquipeRole
    {
        private IDepotUtilisateurEquipeRole _depotUtilisateurEquipeRole;

        public ManipulationDepotUtilisateurEquipeRole(IDepotUtilisateurEquipeRole p_depotUtilisateurEquipeRole)
        {
            this._depotUtilisateurEquipeRole = p_depotUtilisateurEquipeRole;
        }

        public IEnumerable<UtilisateurEquipeRole> ListerUtilisateurEquipeRoles(Guid p_id)
        {
            return this._depotUtilisateurEquipeRole.ListerUtilisateurEquipeRoles(p_id);
        }

        public UtilisateurEquipeRole ChercherUtilisateurEquipeRoleParId(Guid p_id)
        {
            return this._depotUtilisateurEquipeRole.ChercherUtilisateurEquipeRoleParId(p_id);
        }

        public void AjouterUtilisateurEquipeRole(UtilisateurEquipeRole p_utilisateurEquipeRole)
        {
            this._depotUtilisateurEquipeRole.AjouterUtilisateurEquipeRole(p_utilisateurEquipeRole);
        }

        public void ModifierUtilisateurEquipeRole(UtilisateurEquipeRole p_utilisateurEquipeRole)
        {
            this._depotUtilisateurEquipeRole.ModifierUtilisateurEquipeRole(p_utilisateurEquipeRole);
        }

        public void SupprimerUtilisateurEquipeRole(UtilisateurEquipeRole p_utilisateurEquipeRole)
        {
            this._depotUtilisateurEquipeRole.SupprimerUtilisateurEquipeRole(p_utilisateurEquipeRole);
        }
    }
}
