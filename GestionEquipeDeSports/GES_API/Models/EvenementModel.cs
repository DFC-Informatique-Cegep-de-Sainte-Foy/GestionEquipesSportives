﻿using GES_Services.Entites;
using System.ComponentModel.DataAnnotations;
using srvm = GES_Services.Entites;

namespace GES_API.Models
{
    public class EvenementModel
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public int Age { get; set; }
        public string Emplacement { get; set; }
        public DateTime? DateDebut { get; set; }
        public DateTime? DateFin { get; set; }
        public DateTime? DateCreation { get; set; }
        public DateTime? DateModification { get; set; }
        public int TypeEvenement { get; set; }
        public int Etat { get; set; }

        public EvenementModel()
        {
            ;
        }

        public EvenementModel(Evenement p_evenement)
        {
            this.Id = p_evenement.IdEvenement;
            this.Description = p_evenement.Description;
            this.Emplacement = p_evenement.Emplacement;
            this.DateDebut = p_evenement.DateDebut;
            this.DateFin = p_evenement.DateFin;
            this.DateCreation = p_evenement.DateCreation;
            this.DateModification = p_evenement.DateModification;
            this.TypeEvenement = p_evenement.TypeEvenement.IdTypeEvenement;
        }

        public Evenement VersEntite()
        {
          
            return new Evenement(
                    this.Id,
                    this.Description,
                    this.Emplacement,
                    this.DateDebut,
                    this.DateFin,
                    this.TypeEvenement
                );
        }
    }
}
