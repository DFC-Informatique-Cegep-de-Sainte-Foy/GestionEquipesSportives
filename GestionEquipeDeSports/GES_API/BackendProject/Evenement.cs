using System;
using System.Collections.Generic;

namespace GES_API.BackendProject
{
    public partial class Evenement
    {
        public Evenement()
        {
            EquipeEvenements = new HashSet<EquipeEvenement>();
            EvenementJoueurs = new HashSet<EvenementJoueur>();
        }

        public Guid IdEvenement { get; set; }
        public string Description { get; set; } = null!;
        public string Emplacement { get; set; } = null!;
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public DateTime? DateCreation { get; set; }
        public DateTime? DateModification { get; set; }
        public bool Etat { get; set; }
        public int FkIdTypeEvenement { get; set; }

        public virtual TypeEvenement FkIdTypeEvenementNavigation { get; set; } = null!;
        public virtual ICollection<EquipeEvenement> EquipeEvenements { get; set; }
        public virtual ICollection<EvenementJoueur> EvenementJoueurs { get; set; }
    }
}
