using GES_Services.Entites;

namespace GES_API.Models
{
    public class UtilisateurModel
    {
        public Guid IdUtilisateur { get; set; }
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        //public int Age { get; set; }
        public string? Email { get; set; }
        public string? Adresse { get; set; }
        public string? NumTelephone { get; set; }
        public DateTime? DateCreation { get; set; }
        public DateTime? DateModification { get; set; }
        public bool? EstJoueur { get; set; }
        public bool? EstTuteur { get; set; }
        public bool? EstEntraineur { get; set; }
        public bool? EstAdmin { get; set; }
        public bool? Etat { get; set; }
        public UtilisateurModel()
        {
            ;
        }
        public UtilisateurModel(Utilisateur p_utilisateur)
        {
            this.IdUtilisateur = p_utilisateur.IdUtilisateur;
            this.Nom = p_utilisateur.Nom;
            this.Prenom = p_utilisateur.Prenom;
            this.Email = p_utilisateur.Email;
            this.Adresse = p_utilisateur.Adresse;
            this.NumTelephone = p_utilisateur.NumTelephone;
            this.DateCreation = p_utilisateur.DateCreation;
            this.DateModification = p_utilisateur.DateModification;
            this.EstJoueur = p_utilisateur.EstJoueur;
            this.EstTuteur = p_utilisateur.EstTuteur;
            this.EstEntraineur = p_utilisateur.EstEntraineur;
            this.EstAdmin = p_utilisateur.EstAdmin;
            this.Etat = p_utilisateur.Etat;
        }
        public Utilisateur DeModelVersEntite()
        {
            return new Utilisateur(
                this.IdUtilisateur,
                this.Nom,
                this.Prenom,
                //this.Age,
                this.Email,
                this.Adresse,
                this.NumTelephone,
                this.EstJoueur,
                this.EstTuteur,
                this.EstEntraineur,
                this.EstAdmin);
        }
    }
}
