using GES_DAL.DbContexts;
using GES_Services.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_DAL.Depots
{
    public class DepotUtilisateurEquipeRole : GES_Services.Interfaces.IDepotUtilisateurEquipeRole
    {
        public Equipe_sportiveContext m_context;

        public DepotUtilisateurEquipeRole(Equipe_sportiveContext p_context)
        {
            this.m_context = p_context;
        }

        public void AjouterUtilisateurEquipeRole(UtilisateurEquipeRole p_utilisateurEquipeRole)
        {
            if(p_utilisateurEquipeRole is null)
            {
                throw new ArgumentNullException($"le parametre {p_utilisateurEquipeRole} ne peut pas etre null", nameof(p_utilisateurEquipeRole));
            }

            if (m_context.UtilisateurEquipeRole.Any(e => e.IdUtilisateurEquipeRole == p_utilisateurEquipeRole.IdUtilisateurEquipeRole))
            {
                throw new InvalidOperationException($"l'evenement avec le id {p_utilisateurEquipeRole.IdUtilisateurEquipeRole} existe déjà");
            }

        }

        public UtilisateurEquipeRole ChercherUtilisateurEquipeRoleParId(Guid p_id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<UtilisateurEquipeRole> ListerUtilisateurEquipeRoles(Guid p_id)
        {
            throw new NotImplementedException();
        }

        public void ModifierUtilisateurEquipeRole(UtilisateurEquipeRole p_utilisateurEquipeRole)
        {
            throw new NotImplementedException();
        }

        public void SupprimerUtilisateurEquipeRole(UtilisateurEquipeRole p_utilisateurEquipeRole)
        {
            throw new NotImplementedException();
        }
    }
}
