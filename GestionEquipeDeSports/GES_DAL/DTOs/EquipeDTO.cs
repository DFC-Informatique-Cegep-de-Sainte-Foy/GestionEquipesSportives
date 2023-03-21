using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GES_Services.Entites;

namespace GES_DAL.DTOs
{
    public class EquipeDTO
    {
        [Key] public int IdEquipe { get; set; }
        public string Nom { get; set; }
        public string Region { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime DateModification { get; set; }
        public int Etat { get; set; }
        public string Sport { get; set; }
        public string AssociationSportive { get; set; }
        public List<Utilisateur> Membres { get; set; }
        public List<Evenement> Evenements { get; set; }


        public EquipeDTO()
        {
            ;
        }

        public EquipeDTO(Equipe p_equipe)
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
                IdEquipe,
                Nom,
                Region,
                DateCreation,
                DateModification,
                Etat,
                Sport,
                AssociationSportive
                );

            return equipe;
        }
    }
}
