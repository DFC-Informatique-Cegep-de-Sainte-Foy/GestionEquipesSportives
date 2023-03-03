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
        public string DateCreation { get; set; }
        public string DateModification { get; set; }
        public EnumTypeRole TypeRole { get; set; }

        public Utilisateur()
        {

        }

        public Utilisateur(string nom, string prenom, string email, EnumTypeRole typeRole)
        {
            // random id for now
            Id = new Random().Next(1, 1000);
            if (nom != null)
            {
                Nom = nom;
            }

            if (prenom != null)
            {
                Prenom = prenom;
            }

            if (email != null)
            {
                Email = email;
            }
                        
            TypeRole = typeRole;
            DateCreation = DateTime.Now.ToString();
            DateModification = DateTime.Now.ToString();
        }
    }
}
