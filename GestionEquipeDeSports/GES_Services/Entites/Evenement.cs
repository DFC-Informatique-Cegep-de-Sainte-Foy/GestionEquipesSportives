﻿using System;
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


        public Evenement(string description, EnumTypeEvenement typeEvenement, DateTime dateDebut, DateTime dateFin)
        {
            // random id for now
            Id = new Random().Next(1, 1000);

            if (String.IsNullOrEmpty(description) || description.Trim().Length == 0)
            {
                throw new ArgumentException("La description ne peut pas être vide", nameof(description));
            }
            
            if (dateDebut > dateFin)
            {
                throw new ArgumentException("La date de début ne peut pas être supérieure à la date de fin", nameof(dateDebut));
            }

            if (dateDebut < DateTime.Now)
            {
                throw new ArgumentException("La date de début ne peut pas être inférieure à la date actuelle", nameof(dateDebut));
            }

            Description = description;
            TypeEvenement = typeEvenement;

            DateDebut = dateDebut;
            DateFin = dateFin;

            DateCreation = DateTime.Now;
            DateModification = DateTime.Now;

            Etat = 1;
        }

        public Evenement(int id, string description, string emplacement, DateTime dateDebut, DateTime dateFin, DateTime dateCreation, DateTime dateModification, EnumTypeEvenement typeEvenement, int etat)
        {
            Id = id;
            Description = description;
            Emplacement = emplacement;
            DateDebut = dateDebut;
            DateFin = dateFin;
            DateCreation = dateCreation;
            DateModification = dateModification;
            TypeEvenement = typeEvenement;
            Etat = etat;
        }
    }
}
