using System;
using System.Collections.Generic;

namespace GES_DAL.Models
{
    public partial class Utilisateur
    {
        public Utilisateur()
        {
            EquipeJoueurs = new HashSet<EquipeJoueur>();
            EvenementJoueurs = new HashSet<EvenementJoueur>();
        }

        public Guid IdUtilisateur { get; set; }
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        public string? Email { get; set; }
        public string? Adresse { get; set; }
        public string? NumTelephone { get; set; }
        public DateTime? DateCreation { get; set; }
        public DateTime? DateModification { get; set; }
        public bool? EstJoueur { get; set; }
        public bool? EstTuteur { get; set; }
        public bool? EstEntraineur { get; set; }
        public bool? EstAdmin { get; set; }
        public bool? FkIdEtat { get; set; }

        public virtual Etat? FkIdEtatNavigation { get; set; }
        public virtual ICollection<EquipeJoueur> EquipeJoueurs { get; set; }
        public virtual ICollection<EvenementJoueur> EvenementJoueurs { get; set; }

        public GES_Services.Entites.Utilisateur FromDTO()
        {
            return new GES_Services.Entites.Utilisateur(
                IdUtilisateur, 
                Nom, 
                Prenom, 
                Email, 
                Adresse, 
                NumTelephone, 
                EstJoueur, EstTuteur, EstEntraineur, EstAdmin);
        }
    }
}
