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
        public EnumTypeEvenement TypeEvenement { get; set; }

        public Evenement(string description,EnumTypeEvenement typeEvenement)
        {
            // random id for now
            Id = new Random().Next(1, 1000);
            Description = description;
            TypeEvenement = typeEvenement;
        }
    }
}
