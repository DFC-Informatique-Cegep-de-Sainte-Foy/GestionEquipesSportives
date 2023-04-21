using GES_Services.Entites;
using System;
using System.Collections.Generic;

namespace GES_DAL.BackendProject
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
        public int? Age { get; set; }
        public string Email { get; set; } = null!;
        public string? Adresse { get; set; }
        public string? NumTelephone { get; set; }
        public DateTime? DateCreation { get; set; }
        public DateTime? DateModification { get; set; }
        public bool? Etat { get; set; }
        public bool? FkIdEtat { get; set; }
        public int? FkIdRoles { get; set; }
        public virtual Etat? FkIdEtatNavigation { get; set; }
        public virtual Role? FkIdRolesNavigation { get; set; }
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
            this.Etat = p_utilisateur.Etat;

            if (p_utilisateur.Role == GES_Services.Entites.EnumTypeRole.Administrateur)
            {
                this.FkIdRoles = 0;
            }
            else if (p_utilisateur.Role == GES_Services.Entites.EnumTypeRole.Tuteur)
            {
                this.FkIdRoles = 1;
            }
            else if (p_utilisateur.Role == GES_Services.Entites.EnumTypeRole.Entraineur)
            {
                this.FkIdRoles = 2;
            }
            else if (p_utilisateur.Role == GES_Services.Entites.EnumTypeRole.Athlete)
            {
                this.FkIdRoles = 3;
            }
            Etat = p_utilisateur.Etat;
        }

        public GES_Services.Entites.Utilisateur DeDTOVersEntite()
        {

            EnumTypeRole enumTypeRole = EnumTypeRole.Administrateur;

            if (this.FkIdRoles == 0)
            {
                enumTypeRole = EnumTypeRole.Administrateur;
            }
            else if (this.FkIdRoles == 1)
            {
                enumTypeRole = EnumTypeRole.Tuteur;
            }
            else if (this.FkIdRoles == 2)
            {
                enumTypeRole = EnumTypeRole.Entraineur;
            }
            else if (this.FkIdRoles == 3)
            {
                enumTypeRole = EnumTypeRole.Athlete;
            }
            
            return new GES_Services.Entites.Utilisateur(
                this.IdUtilisateur,
                this.Nom,
                this.Prenom,
                this.Age,
                this.Email,
                this.Adresse,
                this.NumTelephone,
                enumTypeRole);
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
