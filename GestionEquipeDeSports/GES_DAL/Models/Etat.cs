using System;
using System.Collections.Generic;

namespace GES_DAL.Models
{
    public partial class Etat
    {
        public Etat()
        {
            Equipes = new HashSet<Equipe>();
            Evenements = new HashSet<Evenement>();
            Utilisateurs = new HashSet<Utilisateur>();
        }

        public bool IdEtat { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<Equipe> Equipes { get; set; }
        public virtual ICollection<Evenement> Evenements { get; set; }
        public virtual ICollection<Utilisateur> Utilisateurs { get; set; }
    }
}
