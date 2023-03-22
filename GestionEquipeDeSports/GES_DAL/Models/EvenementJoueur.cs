using System;
using System.Collections.Generic;

namespace GES_DAL.Models
{
    public partial class EvenementJoueur
    {
        public Guid IdEvenementJoueur { get; set; }
        public Guid? FkIdEvenement { get; set; }
        public Guid? FkIdUtilisateur { get; set; }        
        public bool? EstPresentAEvenement { get; set; }
        public virtual Evenement? FkIdEvenementNavigation { get; set; }
        public virtual Utilisateur? FkIdUtilisateurNavigation { get; set; }
    }
}
