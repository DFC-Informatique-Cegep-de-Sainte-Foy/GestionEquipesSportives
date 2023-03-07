using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Entites
{
    public class Equipe
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Description { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime DateModification { get; set; }
        public List<Utilisateur> Membres { get; set; }
        public List<Evenement> Evenements { get; set; }

        public Equipe()
        {
            Membres = new List<Utilisateur>();
            Evenements = new List<Evenement>();            
        }

        public Equipe(string p_nom, string p_description, DateTime p_dateCreation, DateTime p_dateModification)
        {
            if (string.IsNullOrWhiteSpace(p_nom))
            {
                throw new ArgumentNullException("Le nom ne peut pas être vide.");
            }

            if (string.IsNullOrWhiteSpace(p_description))
            {
                throw new ArgumentNullException("La description ne peut être vide.");
            }

            this.Nom = p_nom;
            this.Description = p_description;
            this.DateCreation = p_dateCreation;
            this.DateModification = p_dateModification;
        }
    }
}
