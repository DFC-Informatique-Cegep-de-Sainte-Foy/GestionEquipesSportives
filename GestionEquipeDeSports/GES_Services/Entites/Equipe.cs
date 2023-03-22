using System;
using System.Collections.Generic;
using GES_Services.Entites;

namespace GES_Services.Entites
{
    public class Equipe
    {
        public Equipe(Guid guid, string nom, string region, string sport, string associationSportive)
        {
            bool etat = true;
            DateCreation = DateTime.Now;
            DateModification = DateTime.Now;
            IdEquipe = guid;
            Nom = nom;
            Region = region;
            Sport = sport;
            AssociationSportive = associationSportive;
            Evenements = new List<Evenement>();
            Joueurs = new List<Utilisateur>();           
        }

        public Guid IdEquipe { get; private set; }
        public string? Nom { get; private set; }
        public string? Region { get; private set; }
        public bool? Etat { get; private set; }
        public DateTime? DateCreation { get; private set; }
        public DateTime? DateModification { get; private set; }
        public string? Sport { get; private set; }
        public string? AssociationSportive { get; private set; }
        public ICollection<Evenement> Evenements { get; private set; }
        public ICollection<Utilisateur> Joueurs { get; private set; }
    }
}
