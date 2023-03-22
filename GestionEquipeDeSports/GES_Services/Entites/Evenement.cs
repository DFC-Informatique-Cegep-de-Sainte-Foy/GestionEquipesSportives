using GES_Services.Entites;
using System;
using System.Collections.Generic;

namespace GES_Services.Entites
{
    public class Evenement
    {
        public Evenement(Guid guid, string description, string emplacement, DateTime? dateDebut, DateTime? dateFin, EnumTypeEvenement typeEvenement)
        {            

            IdEvenement = guid;

            if (description is null)
            {
                throw new ArgumentNullException($"parametre {description} est invalide", nameof(description));
            }
            Description = description;
            if(emplacement is null)
            {
                throw new ArgumentNullException($"parametre {emplacement} est invalide", nameof(emplacement));
            }
            Emplacement = emplacement;


            DateDebut = dateDebut;

            if(dateFin < dateDebut)
            {
                throw new ArgumentException($"parametre {dateFin} est invalide, doit etre superieur a date de debut", nameof(dateFin));
            }

            DateFin = dateFin;

            DateCreation = DateTime.Now;
            DateModification = DateTime.Now;
            Etat = true;
            TypeEvenement = typeEvenement;

            //if(typeEvenement < 0)
            //{
            //    throw new ArgumentOutOfRangeException($"parametre {typeEvenement} est invalide", nameof(typeEvenement));
            //}

            //foreach (EnumTypeEvenement type in Enum.GetValues(typeof(EnumTypeEvenement)))
            //{
            //    if (typeEvenement == (int)type)
            //    {
            //        TypeEvenement = type;
            //    }
            //}
        }

        public Guid IdEvenement { get; private set; }
        public string Description { get; private set; } = null!;
        public string Emplacement { get; private set; } = null!;
        public DateTime? DateDebut { get; private set; }
        public DateTime? DateFin { get; private set; }
        public DateTime? DateCreation { get; private set; }
        public DateTime? DateModification { get; private set; }
        public EnumTypeEvenement TypeEvenement { get; private set; }
        public bool? Etat { get; private set; }
    }
}
