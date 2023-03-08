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
        [Key] public int Id { get; set; }
        public string Nom { get; set; }
        public string Description { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime DateModification { get; set; }
        public bool Etat { get; set; }
        public List<Utilisateur> Membres { get; set; }
        public List<Evenement> Evenements { get; set; }

        public EquipeDTO(Equipe p_equipe)
        {
            this.Id = p_equipe.Id;
            this.Nom = p_equipe.Nom;
            this.Description = p_equipe.Description;
            this.DateCreation = p_equipe.DateCreation;
            this.DateModification = p_equipe.DateModification;
            this.Etat = p_equipe.Etat;
            this.Membres = p_equipe.Membres;
            this.Evenements = p_equipe.Evenements;
        }

        public Equipe VersEntite()
        {
            Equipe equipe = new Equipe(
                this.Nom,
                this.Description,
                this.DateCreation,
                this.DateModification
                );

            return equipe;
        }
    }
}
