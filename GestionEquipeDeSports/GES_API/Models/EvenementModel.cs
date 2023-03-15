using GES_Services.Entites;
using System.ComponentModel.DataAnnotations;
using srvm = GES_Services.Entites;

namespace GES_API.Models
{
    public class EvenementModel
    {

        [Key] public int Id { get; set; }
        public string Description { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime DateModification { get; set; }
        public EnumTypeEvenement TypeEvenement { get; set; }
        public bool Etat { get; set; }

        public EvenementModel()
        {
            ;
        }

        public EvenementModel(srvm.Evenement p_evenementModel)
        {
            this.Id = p_evenementModel.Id;
            this.Description = p_evenementModel.Description;
            this.DateDebut = p_evenementModel.DateDebut;
            this.DateFin = p_evenementModel.DateFin;
            this.DateCreation = p_evenementModel.DateCreation;
            this.DateModification = p_evenementModel.DateModification;
            this.TypeEvenement = p_evenementModel.TypeEvenement;
            this.Etat = p_evenementModel.Etat;
        }

        public srvm.Evenement VersEntite()
        {
            return new srvm.Evenement(
                    this.Id,
                    this.Description,
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
