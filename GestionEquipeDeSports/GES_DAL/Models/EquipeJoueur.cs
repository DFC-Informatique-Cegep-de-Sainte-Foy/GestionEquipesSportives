using System;
using System.Collections.Generic;

namespace GES_DAL.Models
{
    public partial class EquipeJoueur
    {
        public Guid IdJoueurEquipe { get; set; }
        public Guid? Id { get; set; }
        public Guid? FkIdEquipe { get; set; }
        public int? FkIdRoles { get; set; }

        public virtual Equipe? FkIdEquipeNavigation { get; set; }
        public virtual Role? FkIdRolesNavigation { get; set; }
        public virtual Utilisateur? IdNavigation { get; set; }
    }
}
