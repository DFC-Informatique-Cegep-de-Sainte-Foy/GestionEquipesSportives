using System.ComponentModel.DataAnnotations;
using GES_Services.Entites;

namespace GES_API.Models
{
    public class EquipeModel
    {
        public Guid IdEquipe { get; set; }
        public string? Nom { get; set; }
        public string? Region { get; set; }
        public bool? Etat { get; set; }
        public DateTime? DateCreation { get; set; }
        public DateTime? DateModification { get; set; }
        public string? Sport { get; set; }
        public string? AssociationSportive { get; set; }
        public ICollection<Evenement> Evenements { get; set; }
        public ICollection<Utilisateur> Joueurs { get; set; }

        public EquipeModel()
        {
            ;
        }

        public EquipeModel(Equipe p_equipe)
        {
            this.IdEquipe = p_equipe.IdEquipe;
            this.Nom = p_equipe.Nom;
            this.Region = p_equipe.Region;
            this.Sport = p_equipe.Sport;
            this.AssociationSportive = p_equipe.AssociationSportive;
            this.Etat = p_equipe.Etat;
            this.DateCreation = p_equipe.DateCreation;
            this.DateModification = p_equipe.DateModification;
            this.Joueurs = p_equipe.Joueurs;
            this.Evenements = p_equipe.Evenements;
        }

        public Equipe DeModelVersEntite()
        {
            return new Equipe(
                this.IdEquipe,
                this.Nom,
                this.Region,
                this.Sport,
                this.AssociationSportive                           
                );
        }
    }
}
