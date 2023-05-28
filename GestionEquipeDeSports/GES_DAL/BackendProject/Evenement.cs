using GES_Services.Entites;
using System;
using System.Collections.Generic;

namespace GES_DAL.BackendProject
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
        public DateTime? DateDebut { get; set; }
        public DateTime? DateFin { get; set; }
        public DateTime? DateCreation { get; set; }
        public DateTime? DateModification { get; set; }
        public bool? Etat { get; set; }
        public int FkIdTypeEvenement { get; set; }
        public double? Duree { get; set; }

        public virtual TypeEvenement FkIdTypeEvenementNavigation { get; set; } = null!;
        public virtual ICollection<EquipeEvenement> EquipeEvenements { get; set; }
        public virtual ICollection<EvenementJoueur> EvenementJoueurs { get; set; }

        public Evenement(GES_Services.Entites.Evenement evenement)
        {
            IdEvenement = evenement.IdEvenement;
            Description = evenement.Description;
            Emplacement = evenement.Emplacement;
            DateDebut = evenement.DateDebut;
            DateFin = evenement.DateFin;
            DateCreation = evenement.DateCreation;
            DateModification = evenement.DateModification;
            FkIdTypeEvenement = (int)evenement.TypeEvenement.IdTypeEvenement;
            Etat = evenement.Etat;
            Duree = evenement.Duree;
        }

        public GES_Services.Entites.Evenement DeDTOVersEntite()
        {
            return new GES_Services.Entites.Evenement(IdEvenement, Description, Emplacement, DateDebut, DateFin, Duree, FkIdTypeEvenement);
        }
    }
}
