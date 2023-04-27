using GES_DAL.DbContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GES_Services.Interfaces;
using GES_Services.Entites;

namespace GES_DAL.Depots
{
    public class DepotEvenementJoueurSQLServer : IDepotEvenementJoueur
    {
        public Equipe_sportiveContext m_context;

        public DepotEvenementJoueurSQLServer(Equipe_sportiveContext p_context)
        {
            if (p_context is null)
            {
                throw new ArgumentNullException(nameof(p_context));
            }

            this.m_context = p_context;
        }

        public void AjouterPresencePourJoueur(EvenementJoueur p_evenementJoueur)
        {
            if (p_evenementJoueur == null)
            {
                throw new ArgumentNullException(nameof(p_evenementJoueur));
            }
            //trouver le bon evenement avec l'id evenement dans le parametre
            //Evenement? evenement = this.m_context.Evenements.Find(p_evenementJoueur.Fk_Id_Evenement);

            //trouver le bon joueur avec l'id joueur dans le parametre
            //Utilisateur? utilisateur = this.m_context.Utilisateurs.Find(p_evenementJoueur.Fk_Id_Utilisateur);

            //Valider que l'evenement et le joueur existent dans la table d'intersection
            GES_DAL.BackendProject.EvenementJoueur? evenement = this.m_context.EvenementJoueurs.SingleOrDefault(e => e.Fk_Id_Evenement == p_evenementJoueur.Fk_Id_Evenement && e.Fk_Id_Utilisateur == p_evenementJoueur.Fk_Id_Utilisateur);

            if (evenement == null)
            {
                this.m_context.EvenementJoueurs.Add(new GES_DAL.BackendProject.EvenementJoueur()
                {
                    Fk_Id_Evenement = p_evenementJoueur.Fk_Id_Evenement,
                    Fk_Id_Utilisateur = p_evenementJoueur.Fk_Id_Utilisateur,
                    EstPresentAevenement = p_evenementJoueur.EstPresentAevenement
                });
            }
            else
            {
                {
                    evenement.EstPresentAevenement = p_evenementJoueur.EstPresentAevenement;
                    this.m_context.Update(evenement);
                }
            }
            this.m_context.SaveChanges();
        }

        public EvenementJoueur ChercherJoueurParIdEvenementIdJoueur(EvenementJoueur p_evenementJoueur)
        {
            GES_DAL.BackendProject.EvenementJoueur? evenement = this.m_context.EvenementJoueurs.SingleOrDefault(e => e.Fk_Id_Evenement == p_evenementJoueur.Fk_Id_Evenement && e.Fk_Id_Utilisateur == p_evenementJoueur.Fk_Id_Utilisateur);

            if (evenement == null)
            {
                return null;
            }

            return new EvenementJoueur()
            {
                Fk_Id_Evenement = evenement.Fk_Id_Evenement,
                Fk_Id_Utilisateur = evenement.Fk_Id_Utilisateur,
                EstPresentAevenement = evenement.EstPresentAevenement
            };
        }


        public IEnumerable<EvenementJoueur> ChercherEvenementParIdUtilisateur(Guid p_id)
        {
            if (p_id == Guid.Empty)
            {
                throw new ArgumentOutOfRangeException("le parametre \"id\" doit etre superieur a 0", nameof(p_id));
            }
            //trouver joueur s'il existe
            GES_DAL.BackendProject.Utilisateur? utitlisateurDTO = this.m_context.Utilisateurs.FirstOrDefault(u => u.IdUtilisateur == p_id);
            if (utitlisateurDTO == null)
            {
                throw new InvalidOperationException($"l'utilisateur avec l'id {p_id} n'existe pas");
            }

            //trouver les idEvenementJoueurs pour l'evenement dans table intersection
            IEnumerable<Guid> idEvenementJoueurs = this.m_context.EvenementJoueurs.Where(e => e.Fk_Id_Utilisateur == p_id).Select(e => e.IdEvenementJoueur);

            //GES_DAL.BackendProject.Evenement? evenementDTO = this.m_context.Evenements.FirstOrDefault(e => e.IdEvenement == p_id);
            //if (evenementDTO == null)
            //{
            //    throw new InvalidOperationException($"l'evenement avec l'id (p_id) n'existe pas");
            //}

            ////trouver les idEvenementJoueurs pour l'evenement dans table intersection
            //IEnumerable<Guid> idEvenementJoueurs = this.m_context.EvenementJoueurs.Where(e => e.Fk_Id_Evenement == p_id).Select(e => e.IdEvenementJoueur);

            //trouver les donnees dans table
            IEnumerable<EvenementJoueur> evenementJoueurDTO = this.m_context.EvenementJoueurs.Where(e => idEvenementJoueurs.Contains(e.IdEvenementJoueur)).Select(e => e.DeDTOVersEntite());

            return evenementJoueurDTO;
        }
    }
}
