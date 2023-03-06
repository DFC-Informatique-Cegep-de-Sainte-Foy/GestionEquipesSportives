using GES_Services.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_DAL.DTOs
{
    public class EvenementDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime DateModification { get; set; }
        public EnumTypeEvenement TypeEvenement { get; set; }

        public EvenementDTO(GES_Services.Entites.Evenement evenement)
        {
            Id = evenement.Id;
            Description = evenement.Description;
            DateDebut = evenement.DateDebut;
            DateFin = evenement.DateFin;
            DateCreation = evenement.DateCreation;
            DateModification = evenement.DateModification;
            TypeEvenement = evenement.TypeEvenement;
        }

        public GES_Services.Entites.Evenement VersEntite()
        {
            return new GES_Services.Entites.Evenement(Description, TypeEvenement, DateDebut, DateFin);
        }
            
 
    }
}
