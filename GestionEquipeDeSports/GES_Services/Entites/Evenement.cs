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
        public string Emplacement { get; private set; }
        public DateTime DateDebut { get; private set; }
        public DateTime DateFin { get; private set; }
        public DateTime DateCreation { get; private set; }
        public DateTime DateModification { get; private set; }
        public EnumTypeEvenement TypeEvenement { get; private set; }
        public int Etat { get; private set; }

        public Evenement(string description,string emplacement, DateTime dateDebut, DateTime dateFin, EnumTypeEvenement typeEvenement)
        {
            if (String.IsNullOrEmpty(description) || description.Trim().Length == 0)
            {
                throw new ArgumentException("La description ne peut pas être vide", nameof(description));
            }
            
            if (dateDebut > dateFin)
            {
                throw new ArgumentException("La date de début ne peut pas être supérieure à la date de fin", nameof(dateDebut));
            }

            //if (dateDebut < DateTime.Now)
            //{
            //    throw new ArgumentException("La date de début ne peut pas être inférieure à la date actuelle", nameof(dateDebut));
            //}

            Description = description;
            TypeEvenement = typeEvenement;
            Emplacement = emplacement;
            DateDebut = dateDebut;
            DateFin = dateFin;
            DateCreation = DateTime.Now;
            DateModification = DateTime.Now;
            Etat = 1;
        }

        public Evenement(int p_id, string p_description, string p_emplacement, DateTime p_dateDebut, DateTime p_dateFin, DateTime p_dateCreation, DateTime p_dateModification, EnumTypeEvenement p_typeEvenement, int p_etat)
        {
            if(p_id < 0)
            {
                throw new ArgumentOutOfRangeException("Le paramètre p_id ne peut pas être négatif", nameof(p_id));
            }
            if (String.IsNullOrEmpty(p_description) || p_description.Trim().Length == 0)
            {
                throw new ArgumentException("La description ne peut pas être vide", nameof(p_description));
            }
            if (String.IsNullOrEmpty(p_emplacement) || p_emplacement.Trim().Length == 0)
            {
                throw new ArgumentException("L'emplacement ne peut pas être vide", nameof(p_emplacement));
            }
            if (p_dateDebut > p_dateFin)
            {
                throw new ArgumentException("La date de début ne peut pas être supérieure à la date de fin", nameof(p_dateDebut));
            }
            if (p_etat < 0)
            {
                throw new ArgumentOutOfRangeException("Le paramètre p_etat ne peut pas être négatif", nameof(p_etat));
            }

            Id = p_id;
            Description = p_description;
            Emplacement = p_emplacement;
            DateDebut = p_dateDebut;
            DateFin = p_dateFin;
            DateCreation = p_dateCreation;
            DateModification = p_dateModification;
            TypeEvenement = p_typeEvenement;
            Etat = p_etat;
        }
    }
}
