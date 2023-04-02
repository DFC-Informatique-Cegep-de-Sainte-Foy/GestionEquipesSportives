using System;
using System.Collections.Generic;

namespace GES_API.BackendProject
{
    public partial class EvenementJoueur
    {
        public Guid IdEvenementJoueur { get; set; }
        public bool EstPresentAevenement { get; set; }
        public Guid FkIdEvenement { get; set; }
        public Guid FkIdUtilisateur { get; set; }

        public virtual Evenement FkIdEvenementNavigation { get; set; } = null!;
        public virtual Utilisateur FkIdUtilisateurNavigation { get; set; } = null!;
    }
}
