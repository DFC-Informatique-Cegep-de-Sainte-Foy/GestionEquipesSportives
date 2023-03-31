using GES_DAL.Data;
using GES_Services.Interfaces;
using Entite = GES_Services.Entites;
using GES_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_DAL.Depots
{
    public class DepotUtilisateurSQLServer : IDepotUtilisateur
    {
        public Equipe_sportiveContext m_context;
        public DepotUtilisateurSQLServer(Equipe_sportiveContext p_context)
        {
            if (p_context is null)
            {
                throw new ArgumentNullException(nameof(p_context));
            }
            this.m_context = p_context;
        }
        public void AjouterUtilisateur(Entite.Utilisateur p_utilisateur)
        {
            if (p_utilisateur is null)
            {
                throw new ArgumentNullException($"le parametre {p_utilisateur} ne peut pas etre null", nameof(p_utilisateur));
            }

            if (m_context.Utilisateurs.Any(e => e.IdUtilisateur == p_utilisateur.IdUtilisateur))
            {
                throw new InvalidOperationException($"l'evenement avec le id {p_utilisateur.IdUtilisateur} existe déjà");
            }

            m_context.Utilisateurs.Add(new GES_DAL.Models.Utilisateur(p_utilisateur));

            m_context.SaveChanges();
        }
        public Entite.Utilisateur ChercherUtilisateurParId(Guid p_id)
        {
            if (p_id == Guid.Empty)
            {
                throw new ArgumentOutOfRangeException("le parametre \"id\" doit etre superieur a 0", nameof(p_id));
            }
            GES_DAL.Models.Utilisateur? utilisateurDTO = m_context.Utilisateurs.FirstOrDefault(e => e.IdUtilisateur == p_id);

            if (utilisateurDTO is null)
            {
                throw new InvalidOperationException($"l'evenement avec le id {p_id} n'existe pas");
            }

            return utilisateurDTO.FromDTO();
        }
        public IEnumerable<Entite.Utilisateur> ListerUtilisateurs()
        {
            //select * from Utilisateur
            return m_context.Utilisateurs.ToList().Select(e => e.FromDTO());
        }
        public void ModifierUtilisateur(Entite.Utilisateur p_utilisateur)
        {
            throw new NotImplementedException();
        }

        public void SupprimerUtilisateur(Entite.Utilisateur p_utilisateur)
        {
            throw new NotImplementedException();
        }

        public DateTime RecuperationDateModification(Guid id)
        {
            //m_context.Utilisateurs.

            throw new NotImplementedException();
        }
    }
}
