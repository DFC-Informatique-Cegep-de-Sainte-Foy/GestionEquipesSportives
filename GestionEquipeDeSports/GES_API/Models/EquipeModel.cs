using System.ComponentModel.DataAnnotations;
using GES_Services.Entites;

namespace GES_API.Models
{
    public class EquipeModel
    {
        public int IdEquipe { get; set; }
        public string Nom { get; set; }
        public string Region { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime DateModification { get; set; }
        public int Etat { get; set; }
        public string Sport { get; set; }
        public string AssociationSportive { get; set; }
        public List<Utilisateur> Membres { get; set; }
        public List<Evenement> Evenements { get; set; }

        /*public string Sport { get; set; }
        public string AssociationSportive { get; set; }*/

        public EquipeModel()
        {
            ;
        }

        public EquipeModel(Equipe p_equipe)
        {
            this.IdEquipe = p_equipe.IdEquipe;
            this.Nom = p_equipe.Nom;
            this.Region = p_equipe.Region;
            this.DateCreation = p_equipe.DateCreation;
            this.DateModification = p_equipe.DateModification;
            this.Etat = p_equipe.Etat;
            this.Sport = p_equipe.Sport;
            this.AssociationSportive = p_equipe.AssociationSportive;
            this.Membres = p_equipe.Membres;
            this.Evenements = p_equipe.Evenements;
        }

        public Equipe VersEntite()
        {
            Equipe equipe = new Equipe(
                //this.IdEquipe,
                this.Nom,
                this.Region,
                this.Sport,
                this.AssociationSportive
                );

            return equipe;
        }
    }
}
