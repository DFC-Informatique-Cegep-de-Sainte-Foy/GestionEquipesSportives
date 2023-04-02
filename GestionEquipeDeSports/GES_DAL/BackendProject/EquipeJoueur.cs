using GES_Services.Entites;
using System;
using System.Collections.Generic;

namespace GES_DAL.BackendProject
{
    public partial class EquipeJoueur
    {
        public Guid? IdJoueurEquipe { get; set; }
        public Guid? FkIdUtilisateur { get; set; }
        public Guid? FkIdEquipe { get; set; }

        public virtual Equipe FkIdEquipeNavigation { get; set; } = null!;
        public virtual Utilisateur FkIdUtilisateurNavigation { get; set; } = null!;

        public EquipeJoueur()
        {
            ;
        }

        public EquipeJoueur(GES_Services.Entites.EquipeJoueur p_equipeJoueur)
        {
            this.IdJoueurEquipe = p_equipeJoueur.IdJoueurEquipe;
            this.FkIdEquipe = p_equipeJoueur.FkIdEquipe;
            this.FkIdUtilisateur = p_equipeJoueur.FkIdUtilisateur;
        }
        public GES_Services.Entites.EquipeJoueur FromDTO()
        {
            return new GES_Services.Entites.EquipeJoueur(IdJoueurEquipe, FkIdUtilisateur, FkIdEquipe);
        }
    }
}
