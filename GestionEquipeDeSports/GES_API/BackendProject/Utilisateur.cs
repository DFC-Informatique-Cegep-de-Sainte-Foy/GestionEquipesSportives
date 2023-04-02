using System;
using System.Collections.Generic;

namespace GES_API.BackendProject
{
    public partial class Utilisateur
    {
        public Utilisateur()
        {
            EquipeJoueurs = new HashSet<EquipeJoueur>();
            EvenementJoueurs = new HashSet<EvenementJoueur>();
        }

        public Guid IdUtilisateur { get; set; }
        public string Nom { get; set; } = null!;
        public string Prenom { get; set; } = null!;
        public int Age { get; set; }
        public string Email { get; set; } = null!;
        public string? Adresse { get; set; }
        public string? NumTelephone { get; set; }
        public DateTime? DateCreation { get; set; }
        public DateTime? DateModification { get; set; }
        public bool Etat { get; set; }
        public bool? FkIdEtat { get; set; }
        public int? FkIdRoles { get; set; }

        public virtual Etat? FkIdEtatNavigation { get; set; }
        public virtual Role? FkIdRolesNavigation { get; set; }
        public virtual ICollection<EquipeJoueur> EquipeJoueurs { get; set; }
        public virtual ICollection<EvenementJoueur> EvenementJoueurs { get; set; }
    }
}
