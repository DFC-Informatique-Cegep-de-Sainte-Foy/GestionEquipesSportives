using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Entites
{
    public class Utilisateur
    {
        public int Id { get; private set; }
        public string Nom { get; private set; }
        public string Prenom { get; private set; }
        public string Email { get; private set; }
        public string MotDePasse { get; private set; }        
        public DateTime DateCreation { get; private set; }
        public DateTime DateModification { get; private set; }
        
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
