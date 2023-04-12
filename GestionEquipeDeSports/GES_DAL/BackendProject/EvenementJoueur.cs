using System;
using System.Collections.Generic;

namespace GES_DAL.BackendProject
{
    public partial class EvenementJoueur
    {
        public Guid IdEvenementJoueur { get; set; }
        public bool EstPresentAevenement { get; set; }
        public Guid Fk_Id_Evenement { get; set; }
        public Guid Fk_Id_Utilisateur { get; set; }

        public virtual Evenement FkIdEvenementNavigation { get; set; } = null!;
        public virtual Utilisateur FkIdUtilisateurNavigation { get; set; } = null!;

        public EvenementJoueur()
        {
            ;
        }

        //public EvenementJoueur(GES_Services.Entites.EvenementJoueur evenementJoueur)
        //{
        //    IdEvenementJoueur = evenementJoueur.IdEvenementJoueur;
        //    EstPresentAevenement = evenementJoueur.EstPresentAevenement;
        //    FkIdEvenement = evenementJoueur.FkIdEvenement;
        //    FkIdUtilisateur = evenementJoueur.FkIdUtilisateur;
        //}

        //public GES_Services.Model.EvenementJoueur DeDTOVersModel()
        //{
        //    return new GES_Services.Entites.EvenementJoueur(IdEvenementJoueur, EstPresentAevenement, FkIdEvenement, FkIdUtilisateur);
        //}
    }
}
