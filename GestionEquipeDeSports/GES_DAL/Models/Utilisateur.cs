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
        public int? Age { get; set; }
        public string? Email { get; set; }
        public string? Adresse { get; set; }
        public string? NumTelephone { get; set; }
        public int? IdRole { get; set; }
        public bool? FK_Id_Etat { get; set; }

        public DateTime? DateCreation { get; set; }
        public DateTime? DateModification { get; set; }
        /*public bool? EstJoueur { get; set; }
        public bool? EstTuteur { get; set; }
        public bool? EstEntraineur { get; set; }
        public bool? EstAdmin { get; set; }*/
        //public bool? Etat { get; set; }

        public virtual Etat? FkIdEtatNavigation { get; set; }
        public virtual ICollection<EquipeJoueur> EquipeJoueurs { get; set; }
        public virtual ICollection<EvenementJoueur> EvenementJoueurs { get; set; }

        public Utilisateur(GES_Services.Entites.Utilisateur p_utilisateur)
        {
            this.IdUtilisateur = p_utilisateur.IdUtilisateur;
            this.Nom = p_utilisateur.Nom;
            this.Prenom = p_utilisateur.Prenom;
            this.Age = p_utilisateur.Age;
            this.Email = p_utilisateur.Email;
            this.Adresse = p_utilisateur.Adresse;
            this.NumTelephone = p_utilisateur.NumTelephone;

            if (p_utilisateur.DateCreation == null)
            {
                this.DateCreation = DateTime.Now;
            }
            else
            {
                this.DateCreation = p_utilisateur.DateCreation;
            }
            this.DateModification = DateTime.Now;

            /*this.EstJoueur = p_utilisateur.EstJoueur;
            this.EstTuteur = p_utilisateur.EstTuteur;
            this.EstEntraineur = p_utilisateur.EstEntraineur;
            this.EstAdmin = p_utilisateur.EstAdmin;*/

            this.IdRole = p_utilisateur.IdRole;
            this.FK_Id_Etat = p_utilisateur.FK_Id_Etat;
           
        }
        public GES_Services.Entites.Utilisateur FromDTO()
        {
            return new GES_Services.Entites.Utilisateur(
                this.IdUtilisateur,
                this.Nom,
                this.Prenom,
                this.Age,
                this.Email,
                this.Adresse,
                this.NumTelephone,
                this.IdRole,
                this.FK_Id_Etat);
        }

        private void validationDateModification()
        {
            if (this.DateModification == null)
            {
                this.DateModification = DateTime.Now;
            }

        }
    }
}
