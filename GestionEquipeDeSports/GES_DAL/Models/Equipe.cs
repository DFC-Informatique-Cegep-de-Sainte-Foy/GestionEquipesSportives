using System;
using System.Collections.Generic;

namespace GES_DAL.Models
{
    public partial class Equipe
    {
        public Equipe()
        {
            EquipeEvenements = new HashSet<EquipeEvenement>();
            EquipeJoueurs = new HashSet<EquipeJoueur>();
        }      

        public Guid IdEquipe { get; set; }
        public string? Nom { get; set; }
        public string? Region { get; set; }
        public bool? Etat { get; set; }
        public DateTime? DateCreation { get; set; }
        public DateTime? DateModification { get; set; }
        public string? Sport { get; set; }
        public string? AssociationSportive { get; set; }

        public virtual Etat? EtatNavigation { get; set; }
        public virtual ICollection<EquipeEvenement> EquipeEvenements { get; set; }
        public virtual ICollection<EquipeJoueur> EquipeJoueurs { get; set; }

        public Equipe(GES_Services.Entites.Equipe p_equipe)
        {
            this.IdEquipe = p_equipe.IdEquipe;
            this.Nom = p_equipe.Nom;
            this.Region = p_equipe.Region;
            this.Etat = p_equipe.Etat;
            this.DateCreation = p_equipe?.DateCreation;
            this.DateModification = p_equipe.DateModification;
            this.Sport = p_equipe.Sport;
            this.AssociationSportive = p_equipe.AssociationSportive;
        }

        //conversion de GES_DAL.Models.Equipe vers GES_Services.Entites.Equipe
        public GES_Services.Entites.Equipe FromDTO()
        {
            return new GES_Services.Entites.Equipe(IdEquipe, Nom, Region, Sport, AssociationSportive);
        }

    }
}
