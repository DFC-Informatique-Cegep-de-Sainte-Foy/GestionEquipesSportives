using GES_DAL.DbContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GES_Services.Interfaces;
using GES_DAL.BackendProject;

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

        public void AjouterPresencePourJoueur(GES_Services.Entites.EvenementJoueur p_evenementJoueur)
        {
            //trouver le bon evenement avec l'id evenement dans le parametre
            //Evenement? evenement = this.m_context.Evenements.Find(p_evenementJoueur.Fk_Id_Evenement);

            //trouver le bon joueur avec l'id joueur dans le parametre
            //Utilisateur? utilisateur = this.m_context.Utilisateurs.Find(p_evenementJoueur.Fk_Id_Utilisateur);

            //Valider que l'evenement et le joueur existent dans la table d'intersection
            EvenementJoueur? evenement =  this.m_context.EvenementJoueurs.SingleOrDefault(e => e.Fk_Id_Evenement == p_evenementJoueur.Fk_Id_Evenement && e.Fk_Id_Utilisateur == p_evenementJoueur.Fk_Id_Utilisateur);
            if (evenement == null)
            {
                this.m_context.EvenementJoueurs.Add(new EvenementJoueur()
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
                }
            }
            this.m_context.SaveChanges();
        }

        public GES_Services.Entites.EvenementJoueur ChercherJoueurParIdEvenementIdJoueur(GES_Services.Entites.EvenementJoueur p_evenementJoueur)
        {
            EvenementJoueur? evenement = this.m_context.EvenementJoueurs.SingleOrDefault(e => e.Fk_Id_Evenement == p_evenementJoueur.Fk_Id_Evenement && e.Fk_Id_Utilisateur == p_evenementJoueur.Fk_Id_Utilisateur);

            if (evenement == null)
            {
                return null;
            }          
            
            return new GES_Services.Entites.EvenementJoueur()
            {
                Fk_Id_Evenement = evenement.Fk_Id_Evenement,
                Fk_Id_Utilisateur = evenement.Fk_Id_Utilisateur,
                EstPresentAevenement = evenement.EstPresentAevenement
            };
        }


        IEnumerable<GES_Services.Entites.EvenementJoueur> IDepotEvenementJoueur.ChercherJoueurParIdEvenement(Guid p_id)
        {
            throw new NotImplementedException();
        }
    }
}
