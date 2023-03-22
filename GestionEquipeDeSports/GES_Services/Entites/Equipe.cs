using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Entites
{
    public class Equipe
    {
        public int IdEquipe { get; private set; }
        public string Nom { get; private set; }
        public string Region { get; private set; }
        public DateTime DateCreation { get; private set; }
        public DateTime DateModification { get; private set; }
        public int Etat { get; private set; }
        public string Sport { get; private set; }
        public string AssociationSportive { get; private set; }
        public List<Utilisateur> Membres { get; private set; }
        public List<Evenement> Evenements { get; private set; }

        public Equipe()
        {
            Membres = new List<Utilisateur>();
            Evenements = new List<Evenement>();            
        }

        public Equipe(string p_nom, string p_region, string p_sport, string p_associationSportive)
        {
            if (string.IsNullOrWhiteSpace(p_nom))
            {
                throw new ArgumentNullException("Le paramètre p_nom ne peut pas être null.", nameof(p_nom));
            }

            if (string.IsNullOrWhiteSpace(p_region))
            {
                throw new ArgumentNullException("La description ne peut être vide.", nameof(p_region));
            }

            //this.IdEquipe = p_id;
            this.Nom = p_nom;
            this.Region = p_region;
            this.DateCreation = DateTime.Now;
            this.DateModification = DateTime.Now;
            this.Sport = p_sport;
            this.AssociationSportive = p_associationSportive;
            this.Etat = 1;
        }

        public Equipe(int p_id, string p_nom, string p_region, DateTime p_dateCreation, DateTime p_dateModification, int p_etat, string p_sport, string p_associationSportive)
        {
            IdEquipe = p_id;
            Nom = p_nom;
            Region = p_region;
            DateCreation = p_dateCreation;
            DateModification = p_dateModification;
            Etat = p_etat;
            Sport = p_sport;
            AssociationSportive = p_associationSportive;
        }
    }
}
