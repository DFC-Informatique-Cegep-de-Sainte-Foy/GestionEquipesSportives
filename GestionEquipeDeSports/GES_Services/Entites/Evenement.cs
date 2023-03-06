using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Entites
{
    public class Evenement
    {
        public int Id { get; private set; }
        public string Description { get; private set; }
        public DateTime DateDebut { get; private set; }
        public DateTime DateFin { get; private set; }
        public DateTime DateCreation { get; private set; }
        public DateTime DateModification { get; private set; }
        public EnumTypeEvenement TypeEvenement { get; private set; }
        public bool Etat { get; private set; }


        public Evenement(string description, EnumTypeEvenement typeEvenement, DateTime dateDebut, DateTime dateFin)
        {
            // random id for now
            Id = new Random().Next(1, 1000);
            if (String.IsNullOrEmpty(description) || description.Trim().Length == 0)
            {
                throw new ArgumentException("La description ne peut pas être vide", nameof(description));
            }
            
            Description = description;
            TypeEvenement = typeEvenement;

            if (dateDebut > dateFin)
            {
                throw new ArgumentException("La date de début ne peut pas être supérieure à la date de fin", nameof(dateDebut));
            }

            if (dateDebut < DateTime.Now)
            {
                throw new ArgumentException("La date de début ne peut pas être inférieure à la date actuelle", nameof(dateDebut));
            }

            DateDebut = dateDebut;
            DateFin = dateFin;

            DateCreation = DateTime.Now;
            DateModification = DateTime.Now;

            Etat = true;
        }
    }
}
