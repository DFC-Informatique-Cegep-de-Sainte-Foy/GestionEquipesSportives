using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Entites
{
    public class Evenement
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime DateModification { get; set; }
        public EnumTypeEvenement TypeEvenement { get; set; }

        public Evenement(string description, EnumTypeEvenement typeEvenement)
        {
            // random id for now
            Id = new Random().Next(1, 1000);
            if (String.IsNullOrEmpty(description) || description.Trim().Length == 0)
            {
                throw new ArgumentException("Description cannot be empty");
            }
            
            Description = description;
            TypeEvenement = typeEvenement;

            DateDebut = DateTime.Now;
            DateFin = DateTime.Now;
        }
    }
}
