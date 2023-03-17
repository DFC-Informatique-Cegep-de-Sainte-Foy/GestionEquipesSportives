using GES_Services.Entites;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_DAL.DTOs
{
    public class EvenementDTO
    {
        [Key] public int Id { get; set; }
        public string Description { get; set; }
        public string Emplacement { get;  set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime DateModification { get; set; }
        public EnumTypeEvenement TypeEvenement { get; set; }
        public int Etat { get; set; }

        public EvenementDTO()
        {
            ;
        }

        public EvenementDTO(Evenement evenement)
        {
            Id = evenement.Id;
            Description = evenement.Description;
            Emplacement = evenement.Emplacement;
            DateDebut = evenement.DateDebut;
            DateFin = evenement.DateFin;
            DateCreation = evenement.DateCreation;
            DateModification = evenement.DateModification;
            TypeEvenement = evenement.TypeEvenement;
            Etat = evenement.Etat;
        }

        public Evenement VersEntite()
        {
            return new Evenement(
                Id, 
                Description, 
                Emplacement, 
                DateDebut, 
                DateFin,
                DateCreation, 
                DateModification, 
                TypeEvenement, 
                Etat);
        }
    }
}
