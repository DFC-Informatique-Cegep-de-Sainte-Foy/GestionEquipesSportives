using GES_Services.Entites;
using System;
using System.Collections.Generic;

namespace GES_Services.Entites
{
    public class Evenement
    {
        public Guid IdEvenement { get; private set; }
        public string Description { get; private set; } = null!;
        public string Emplacement { get; private set; } = null!;
        public DateTime? DateDebut { get; private set; }
        public DateTime? DateFin { get; private set; }
        public DateTime? DateCreation { get; private set; }
        public DateTime? DateModification { get; private set; }
        public TypeEvenement TypeEvenement { get; private set; }
        public bool? Etat { get; private set; }
        public double? Duree { get; private set; }

        public Evenement()
        {
            ;
        }

        public Evenement(string description, DateTime dateDebut, double? duree, string emplacement, string typeEvenement)
        {
            if (typeEvenement == "entrainement")
            {
                TypeEvenement.IdTypeEvenement = 0;
            }
            else if (typeEvenement == "partie")
            {
                TypeEvenement.IdTypeEvenement = 1;
            }
            else if (typeEvenement == "autre")
            {
                TypeEvenement.IdTypeEvenement = 2;
            }
            else
            {
                throw new ArgumentException($"parametre {typeEvenement} est invalide", nameof(typeEvenement));
            }

            if (description is null)
            {
                throw new ArgumentNullException($"parametre {description} est invalide", nameof(description));
            }

            if (emplacement is null)
            {
                throw new ArgumentNullException($"parametre {emplacement} est invalide", nameof(emplacement));
            }

            Duree = duree;
            Description = description;
            DateDebut = dateDebut;
            DateFin = DateDebut?.AddMinutes((double)duree);
            Emplacement = emplacement;
        }

        public Evenement(Guid guid, string description, string emplacement, DateTime? dateDebut, double? duree, int typeEvenement)
        {
            if (guid == Guid.Empty)
            {
                IdEvenement = Guid.NewGuid();
            }
            else
            {
                IdEvenement = guid;
            }

            if (description is null)
            {
                throw new ArgumentNullException($"parametre {description} est invalide", nameof(description));
            }

            if (emplacement is null)
            {
                throw new ArgumentNullException($"parametre {emplacement} est invalide", nameof(emplacement));
            }

            TypeEvenement = new TypeEvenement();

            Description = description;
            Emplacement = emplacement;
            DateDebut = dateDebut;
            DateFin = DateDebut?.AddMinutes((double)duree);
            Etat = true;
            Duree = duree;
            TypeEvenement.IdTypeEvenement = typeEvenement;
        }

        public Evenement(Guid guid, string description, string emplacement, DateTime? dateDebut, DateTime? dateFin, double? duree, int typeEvenement)
        {

            if (guid == Guid.Empty)
            {
                IdEvenement = Guid.NewGuid();
            }
            else
            {
                IdEvenement = guid;
            }

            //if (typeEvenement == "entrainement")
            //{
            //    TypeEvenement.IdTypeEvenement = 0;
            //}
            //else if (typeEvenement == "partie")
            //{
            //    TypeEvenement.IdTypeEvenement = 1;
            //}
            //else if (typeEvenement == "autre")
            //{
            //    TypeEvenement.IdTypeEvenement = 2;
            //}
            //else
            //{
            //    throw new ArgumentException($"parametre {typeEvenement} est invalide", nameof(typeEvenement));
            //}


            TypeEvenement = new TypeEvenement();

            TypeEvenement.IdTypeEvenement = typeEvenement;

            if (description is null)
            {
                throw new ArgumentNullException($"parametre {description} est invalide", nameof(description));
            }

            if (emplacement is null)
            {
                throw new ArgumentNullException($"parametre {emplacement} est invalide", nameof(emplacement));
            }

            Duree = duree;
            Description = description;
            DateDebut = dateDebut;
            DateFin = dateFin;
            Emplacement = emplacement;
        }
    }
}
