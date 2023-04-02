using System;
using System.Collections.Generic;

namespace GES_API.BackendProject
{
    public partial class EquipeJoueur
    {
        public Guid IdJoueurEquipe { get; set; }
        public Guid FkIdUtilisateur { get; set; }
        public Guid FkIdEquipe { get; set; }

        public virtual Equipe FkIdEquipeNavigation { get; set; } = null!;
        public virtual Utilisateur FkIdUtilisateurNavigation { get; set; } = null!;
    }
}
