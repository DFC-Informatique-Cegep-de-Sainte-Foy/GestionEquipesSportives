using System.ComponentModel.DataAnnotations;
using GES_Services.Entites;

namespace GES_API.Models
{
    public class EquipeModel
    {
        [Key] public int Id { get; set; }
        public string Nom { get; set; }
        public string Region { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime DateModification { get; set; }
        public bool Etat { get; set; }
        public string Sport { get; set; }
        public string AssociationSportive { get; set; }

        public EquipeModel()
        {
            ;
        }

        public EquipeModel(Equipe p_equipe)
        {
            this.Id = p_equipe.Id;
            this.Nom = p_equipe.Nom;
            //this.Region = p_equipe.
            this.DateCreation = p_equipe.DateCreation;
            this.DateModification = p_equipe.DateModification;
        }

        public Equipe VersEntite()
        {
            return new Equipe();
        }
    }
}
