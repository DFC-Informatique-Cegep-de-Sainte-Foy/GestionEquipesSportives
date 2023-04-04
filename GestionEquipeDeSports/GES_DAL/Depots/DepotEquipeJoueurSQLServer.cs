using GES_DAL.DbContexts;
using GES_Services.Entites;
using GES_Services.Interfaces;
using Entite = GES_Services.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_DAL.Depots
{
    public class DepotEquipeJoueurSQLServer : IDepotEquipeJoueur
    {
        public Equipe_sportiveContext m_context;
        public DepotEquipeJoueurSQLServer(Equipe_sportiveContext p_context)
        {
            if(p_context is null)
            {
                throw new ArgumentNullException(nameof(p_context));
            }
            this.m_context = p_context;
        }

        public void AjouterEquipeJoueur(EquipeJoueur p_equipeJoueur)
        {
            if(p_equipeJoueur is null)
            {
                throw new ArgumentNullException(nameof(p_equipeJoueur));
            }
            if(this.m_context.EquipeJoueurs.Any(ej => ej.IdJoueurEquipe == p_equipeJoueur.IdJoueurEquipe))
            {
                throw new InvalidOperationException($"l'utilisateur avec le id {p_equipeJoueur.IdJoueurEquipe} existe déjà");
            }
            this.m_context.EquipeJoueurs.Add(new GES_DAL.BackendProject.EquipeJoueur(p_equipeJoueur));
            this.m_context.SaveChanges();
        }

        public EquipeJoueur ChercherEquipeJoueurParId(Guid p_id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Utilisateur> ListerEquipeJouers(Guid p_id)
        {
            // 1. Trouver equipe
            GES_DAL.BackendProject.Equipe? equipeDTO = m_context.Equipes.FirstOrDefault(e => e.IdEquipe == p_id);
            if(equipeDTO == null)
            {
                throw new InvalidOperationException($"l'equipe avec l'id (p_id) n'existe pas");
            }
            // 2. Trouver les joueurs dans l'equipe
            IEnumerable<Guid?> joueurs = this.m_context.EquipeJoueurs.Where(ej => ej.Fk_Id_Equipe == p_id).Select(ej => ej.Fk_Id_Utilisateur);

            // 3. Trouver les joueurs
            IEnumerable<Utilisateur> utilisateurDTO = this.m_context.Utilisateurs.Where(u => joueurs.Contains(u.IdUtilisateur)).Select(u => u.DeDTOVersEntite());
            return utilisateurDTO;
        }

        public void ModifierEquipeJoueur(EquipeJoueur p_equipeJoueur)
        {
            throw new NotImplementedException();
        }

        public void SupprimerEquipeJoueur(EquipeJoueur p_equipeJoueur)
        {
            throw new NotImplementedException();
        }
    }
}
