using GES_Services.Entites;
using System.ComponentModel.DataAnnotations;
using srvm = GES_Services.Entites;

namespace GES_API.Models
{
    public class EvenementModel
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public int Age { get; set; }
        public string Emplacement { get; set; }
        public DateTime? DateDebut { get; set; }
        public DateTime? DateFin { get; set; }
        public DateTime? DateCreation { get; set; }
        public DateTime? DateModification { get; set; }
        public string TypeEvenement { get; set; }
        public int Etat { get; set; }

        public EvenementModel()
        {
            ;
        }

        public EvenementModel(Evenement p_evenementModel)
        {
            this.Id = p_evenementModel.IdEvenement;
            this.Description = p_evenementModel.Description;
            this.Emplacement = p_evenementModel.Emplacement;
            this.DateDebut = p_evenementModel.DateDebut;
            this.DateFin = p_evenementModel.DateFin;
            this.DateCreation = p_evenementModel.DateCreation;
            this.DateModification = p_evenementModel.DateModification;

            if (p_evenementModel.TypeEvenement.IdTypeEvenement == (int)EnumTypeEvenement.Partie)
            {
                this.TypeEvenement = "Partie";
            }      
            else if (p_evenementModel.TypeEvenement.IdTypeEvenement == (int)EnumTypeEvenement.Entrainement)
            {
                this.TypeEvenement = "Entrainement";
            }
            else
            {
                this.TypeEvenement = "autre";
            }   
        }

        public Evenement VersEntite()
        {
            int enumTypeEvenement;

            if (this.TypeEvenement == "Partie")
            {
                enumTypeEvenement = (int)EnumTypeEvenement.Partie;
            }
            else if (this.TypeEvenement == "Entrainement")
            {
                enumTypeEvenement = (int)EnumTypeEvenement.Entrainement;
            }
            else
            {
                enumTypeEvenement = (int)EnumTypeEvenement.Autre;
            }

            return new Evenement(
                    this.Id,
                    this.Description,
                    this.Emplacement,
                    this.DateDebut,
                    this.DateFin,
                    enumTypeEvenement
                );
        }
    }
}
