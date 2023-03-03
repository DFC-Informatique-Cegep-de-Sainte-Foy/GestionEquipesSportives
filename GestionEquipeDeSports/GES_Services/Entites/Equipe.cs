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
        public List<Utilisateur> ListeMembres { get; set; }
        public List<Evenement> ListeEvenements { get; set; }

        public Equipe()
        {
            ListeMembres = new List<Utilisateur>();
            ListeEvenements = new List<Evenement>();
        }
        
        
    }
}
