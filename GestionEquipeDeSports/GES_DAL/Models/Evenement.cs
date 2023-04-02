﻿using GES_Services.Entites;
using System;
using System.Collections.Generic;

namespace GES_DAL.Models
{
    public partial class Evenement
    {
        public Evenement()
        {
            EquipeEvenements = new HashSet<EquipeEvenement>();
            EvenementJoueurs = new HashSet<EvenementJoueur>();
        }

        public Guid IdEvenement { get; set; }
        public string Description { get; set; } = null!;
        public string Emplacement { get; set; } = null!;
        public DateTime? DateDebut { get; set; }
        public DateTime? DateFin { get; set; }
        public DateTime? DateCreation { get; set; }
        public DateTime? DateModification { get; set; }
        public int? IdTypeEvenement { get; set; }
        public bool? Etat { get; set; }

        public virtual Etat? EtatNavigation { get; set; }
        public virtual TypeEvenement? IdTypeEvenementNavigation { get; set; }
        public virtual ICollection<EquipeEvenement> EquipeEvenements { get; set; }
        public virtual ICollection<EvenementJoueur> EvenementJoueurs { get; set; }


        public Evenement(GES_Services.Entites.Evenement evenement)
        {
            IdEvenement = evenement.IdEvenement;
            Description = evenement.Description;
            Emplacement = evenement.Emplacement;
            DateDebut = evenement.DateDebut;
            DateFin = evenement.DateFin;
            DateCreation= evenement.DateCreation;
            DateModification = evenement.DateModification;
            IdTypeEvenement = (int)evenement.TypeEvenement;
            Etat = evenement.Etat;
        }

        public GES_Services.Entites.Evenement DeDTOVersEntite()
        {
            //conversion de cette property IdTypeEvenement vers ce type EnumTypeEvenement
            EnumTypeEvenement enumTypeEvenement = EnumTypeEvenement.autre;
            foreach (EnumTypeEvenement type in Enum.GetValues(typeof(EnumTypeEvenement)))
            {
                if (IdTypeEvenement == (int)type)
                {
                    enumTypeEvenement = type;
                }
            }

            return new GES_Services.Entites.Evenement(IdEvenement, Description, Emplacement, DateDebut, DateFin, enumTypeEvenement);
        }
    }
}