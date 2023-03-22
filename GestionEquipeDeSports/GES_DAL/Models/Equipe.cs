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


        //conversion de GES_DAL.Models.Equipe vers GES_Services.Entites.Equipe
        public GES_Services.Entites.Equipe FromDTO()
        {
            return new GES_Services.Entites.Equipe(IdEquipe, Nom, Region, Sport, AssociationSportive);
        }

    }
}
