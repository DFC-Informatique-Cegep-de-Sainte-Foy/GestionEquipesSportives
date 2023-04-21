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
            if (p_context is null)
            {
                throw new ArgumentNullException(nameof(p_context));
            }
            this.m_context = p_context;
        }

        public void AjouterEquipeJoueur(EquipeJoueur p_equipeJoueur)
        {
            //if(p_equipeJoueur is null)
            //{
            //    throw new ArgumentNullException(nameof(p_equipeJoueur));
            //}
            //if(this.m_context.EquipeJoueurs.Any(ej => ej.IdJoueurEquipe == p_equipeJoueur.IdJoueurEquipe))
            //{
            //    throw new InvalidOperationException($"l'utilisateur avec le id {p_equipeJoueur.IdJoueurEquipe} existe déjà");
            //}

            //EquipeJoueur ej = ChercherIdEquipeJoueurDansEquipeJoueur(p_equipeJoueur);

            if (p_equipeJoueur is null)
            {
                throw new Exception();
            }

            else
            {
                this.m_context.EquipeJoueurs.Add(new GES_DAL.BackendProject.EquipeJoueur(p_equipeJoueur));

                this.m_context.SaveChanges();
            }
        }

        public EquipeJoueur ChercherEquipeJoueurParId(Guid p_id)
        {
            throw new NotImplementedException();
        }

        public EquipeJoueur ChercherIdEquipeJoueurDansEquipeJoueur(EquipeJoueur p_equipeJoueur)
        {
            if (p_equipeJoueur == null)
            {
                throw new ArgumentNullException(nameof(p_equipeJoueur));
            }

            //Trouver equipe
            GES_DAL.BackendProject.Equipe? equipeDTO = m_context.Equipes.FirstOrDefault(e => e.IdEquipe == p_equipeJoueur.Fk_Id_Equipe);

            if (equipeDTO == null)
            {
                throw new InvalidOperationException($"l'equipe avec le id {p_equipeJoueur.Fk_Id_Equipe} n'existe pas");
            }

            //Trouver utilisateur
            //GES_DAL.BackendProject.Utilisateur? utilisateurDTO = m_context.Utilisateurs.FirstOrDefault(u => u.IdUtilisateur == p_equipeJoueur.Fk_Id_Utilisateur);

            //Trouver les joueurs de l'equipe
            GES_DAL.BackendProject.EquipeJoueur joueurDansEquipe = this.m_context.EquipeJoueurs.SingleOrDefault(ej => ej.Fk_Id_Equipe == p_equipeJoueur.Fk_Id_Equipe && ej.Fk_Id_Utilisateur == p_equipeJoueur.Fk_Id_Utilisateur);
            //IEnumerable<Guid?> joueurs = m_context.EquipeJoueurs.Where(ee => ee.Fk_Id_Equipe == p_equipeJoueur.Fk_Id_Equipe && ee.Fk_Id_Utilisateur == p_equipeJoueur.Fk_Id_Utilisateur)
            //                                                    .Select(ee => ee.IdJoueurEquipe);
            /*if (joueurs.Count() > 1)
            {
                throw new ArgumentOutOfRangeException(nameof(p_equipeJoueur));
            }*/
            EquipeJoueur equipeJoueur;
            if(joueurDansEquipe != null)
            { 
                equipeJoueur = joueurDansEquipe.FromDTO();
                //equipeJoueur.Fk_Id_Utilisateur = p_equipeJoueur.Fk_Id_Utilisateur;
                //equipeJoueur.Fk_Id_Equipe = p_equipeJoueur.Fk_Id_Equipe;

                return equipeJoueur;
            }
            else
            {
                return equipeJoueur = null;
            }
        }

        public EquipeJoueur ChercherIdJoueurtDansEquipeJoueur(Guid p_id)
        {
            if (p_id == Guid.Empty)
            {
                throw new ArgumentOutOfRangeException("le parametre \"id\" doit etre superieur a 0", nameof(p_id));
            }
            GES_DAL.BackendProject.EquipeJoueur? equipeJoueurDTO = m_context.EquipeJoueurs.FirstOrDefault(ej => ej.Fk_Id_Utilisateur == p_id);
            if (equipeJoueurDTO == null)
            {
                throw new InvalidOperationException($"le joueur avec le id {p_id} n'existe pas");
            }
            return equipeJoueurDTO.FromDTO();
        }

        public IEnumerable<Utilisateur> ListerEquipeJouers(Guid p_id)
        {
            // 1. Trouver equipe
            GES_DAL.BackendProject.Equipe? equipeDTO = m_context.Equipes.FirstOrDefault(e => e.IdEquipe == p_id);
            if (equipeDTO == null)
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
            if (p_equipeJoueur is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(p_equipeJoueur));
            }
            if(p_equipeJoueur.IdJoueurEquipe == Guid.Empty)
            {
                throw new ArgumentOutOfRangeException(nameof(p_equipeJoueur));
            }
            GES_DAL.BackendProject.EquipeJoueur? equipeJoueurDTO = m_context.EquipeJoueurs.Where(e => e.IdJoueurEquipe == p_equipeJoueur.IdJoueurEquipe).SingleOrDefault();
            if (equipeJoueurDTO is null)
            {
                throw new InvalidOperationException($"l'evenement avec le id {p_equipeJoueur.IdJoueurEquipe} n'existe pas");
            }
            this.m_context.EquipeJoueurs.Remove(equipeJoueurDTO);
            this.m_context.SaveChanges();
        }
    }
}
