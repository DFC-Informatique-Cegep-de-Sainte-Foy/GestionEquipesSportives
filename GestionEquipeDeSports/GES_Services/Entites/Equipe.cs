using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Entites
{
    public class Equipe
    {
        public int Id { get; private set; }
        public string Nom { get; private set; }
        public string Description { get; private set; }
        public DateTime DateCreation { get; private set; }
        public DateTime DateModification { get; private set; }
        public bool Etat { get; private set; }
        public List<Utilisateur> Membres { get; private set; }
       public List<Evenement> Evenements { get; private set; }

        public Equipe()
        {
            Membres = new List<Utilisateur>();
            Evenements = new List<Evenement>();            
        }

        public Equipe(int p_id, string p_nom, string p_description, DateTime p_dateCreation, DateTime p_dateModification)
        {
            if (string.IsNullOrWhiteSpace(p_nom))
            {
                throw new ArgumentNullException("Le paramètre p_nom ne peut pas être null.", nameof(p_nom));
            }

            if (string.IsNullOrWhiteSpace(p_description))
            {
                throw new ArgumentNullException("La description ne peut être vide.", nameof(p_description));
            }

            this.Id = p_id;
            this.Nom = p_nom;
            this.Description = p_description;
            this.DateCreation = p_dateCreation;
            this.DateModification = p_dateModification;
            this.Etat = true;
        }

        public Equipe(int id, string nom, string description, DateTime dateCreation, DateTime dateModification, bool etat, List<Utilisateur> membres, List<Evenement> evenements)
        {
            Id = id;
            Nom = nom;
            Description = description;
            DateCreation = dateCreation;
            DateModification = dateModification;
            Etat = etat;
            Membres = membres;
            Evenements = evenements;
        }
    }
}
