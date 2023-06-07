using GES_Services.Entites;
using System;
using System.Collections.Generic;

namespace GES_DAL.BackendProject
{
    public partial class UtilisateurEquipeRole
    {
        public Guid IdUtilisateurEquipeRole { get; set; }
        public Guid FkIdUtilisateur { get; set; }
        public Guid FkIdEquipe { get; set; }
        public int FkIdRole { get; set; }

        public virtual Equipe FkIdEquipeNavigation { get; set; } = null!;
        public virtual Role FkIdRoleNavigation { get; set; } = null!;
        public virtual Utilisateur FkIdUtilisateurNavigation { get; set; } = null!;


        public UtilisateurEquipeRole()
        {
            ;
        }

        public UtilisateurEquipeRole(GES_Services.Entites.UtilisateurEquipeRole utilisateurEquipeRole)
        {
            FkIdUtilisateur = utilisateurEquipeRole.FkIdUtilisateur;
            IdUtilisateurEquipeRole = utilisateurEquipeRole.IdUtilisateurEquipeRole;
            FkIdEquipe = utilisateurEquipeRole.FkIdEquipe;
            FkIdRole = utilisateurEquipeRole.FkIdRole;
        }

        public GES_Services.Entites.UtilisateurEquipeRole DeDTOVersEntite()
        {
            return new GES_Services.Entites.UtilisateurEquipeRole(this.IdUtilisateurEquipeRole,FkIdUtilisateur, FkIdEquipe, FkIdRole);
        }
    }
}
