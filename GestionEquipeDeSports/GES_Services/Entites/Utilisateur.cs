using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Entites
{
    public class Utilisateur
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; }
        public string MotDePasse { get; set; }
        
        public DateTime DateCreation { get; set; }
        public DateTime DateModification { get; set; }
        
        public bool EstEntraineur = false;
        public bool EstTuteur = false;
        public bool EstAthlete = false;

        private List<string> roles = new List<string>();

        public Utilisateur(string nom, string prenom, string email, DateTime dateCreation, DateTime dateModification, bool estEntraineur, bool estTuteur, bool estAthlete)
        {
            if (nom.Trim().Length == 0 || nom == null)
            {
                throw new Exception("Le nom ne peut pas être vide");
            }

            if (prenom.Trim().Length == 0 || prenom == null)
            {
                throw new Exception("Le prénom ne peut pas être vide");
            }

            if (email.Trim().Length == 0 || email == null)
            {
                throw new Exception("L'email ne peut pas être vide");
            }
                        
            Nom = nom;
            Prenom = prenom;
            Email = email;
            
            DateCreation = dateCreation;
            DateModification = dateModification;
            
            EstEntraineur = estEntraineur;
            EstTuteur = estTuteur;
            EstAthlete = estAthlete;

            if (EstEntraineur)
            {
                roles.Add("Entraineur");
            }

            if (EstTuteur)
            {
                roles.Add("Tuteur");
            }

            if (EstAthlete)
            {
                roles.Add("Athlete");
            }
        }
    }
}
