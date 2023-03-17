using GES_Services.Entites;
using System.ComponentModel.DataAnnotations;
using srvm = GES_Services.Entites;

namespace GES_API.Models
{
    public class EvenementModel
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Emplacement { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime DateModification { get; set; }
        public EnumTypeEvenement TypeEvenement { get; set; }
        public int Etat { get; set; }

        public EvenementModel()
        {
            ;
        }

        public EvenementModel(Evenement p_evenementModel)
        {
            this.Id = p_evenementModel.Id;
            this.Description = p_evenementModel.Description;
            this.Emplacement = p_evenementModel.Emplacement;
            this.DateDebut = p_evenementModel.DateDebut;
            this.DateFin = p_evenementModel.DateFin;
            this.DateCreation = p_evenementModel.DateCreation;
            this.DateModification = p_evenementModel.DateModification;
            this.TypeEvenement = p_evenementModel.TypeEvenement;
            this.Etat = p_evenementModel.Etat;
        }

        public Evenement VersEntite()
        {
            return new Evenement(
                    this.Id,
                    this.Description,
                    this.Emplacement,
                    this.DateDebut,
                    this.DateFin,
                    this.DateCreation,
                    this.DateModification,
                    this.TypeEvenement,
                    this.Etat
                );
        }
    }
}
