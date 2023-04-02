using System;
using System.Collections.Generic;

namespace GES_API.BackendProject
{
    public partial class Equipe
    {
        public Equipe()
        {
            EquipeEvenements = new HashSet<EquipeEvenement>();
            EquipeJoueurs = new HashSet<EquipeJoueur>();
        }

        public Guid IdEquipe { get; set; }
        public string Nom { get; set; } = null!;
        public string? Region { get; set; }
        public DateTime? DateCreation { get; set; }
        public DateTime? DateModification { get; set; }
        public string Sport { get; set; } = null!;
        public string? AssociationSportive { get; set; }
        public bool Etat { get; set; }
        public bool? FkIdEtat { get; set; }

        public virtual Etat? FkIdEtatNavigation { get; set; }
        public virtual ICollection<EquipeEvenement> EquipeEvenements { get; set; }
        public virtual ICollection<EquipeJoueur> EquipeJoueurs { get; set; }
    }
}
