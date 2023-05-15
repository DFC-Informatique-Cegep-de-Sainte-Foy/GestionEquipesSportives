using GES_Services.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Interfaces
{
    public interface IDepotUtilisateurEquipeRole
    {
        public IEnumerable<UtilisateurEquipeRole> ListerUtilisateurEquipeRoles(Guid p_id);
        public IEnumerable<UtilisateurEquipeRole> ChercherUtilisateurEquipeRoleParId(Guid p_id);
        public void AjouterUtilisateurEquipeRole(UtilisateurEquipeRole p_utilisateurEquipeRole);
        public void ModifierUtilisateurEquipeRole(UtilisateurEquipeRole p_utilisateurEquipeRole);
        public void SupprimerUtilisateurEquipeRole(UtilisateurEquipeRole p_utilisateurEquipeRole);
        public Guid ChercherUtilisateurParEmail(string p_email);
    }
}
