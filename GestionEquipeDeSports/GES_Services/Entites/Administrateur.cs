﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Entites
{
    public class Administrateur
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; }
        public string MotDePasse { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime DateModification { get; set; }

        public Administrateur(string nom, string prenom, string email, string motDePasse, DateTime dateCreation, DateTime dateModification)
        {
            if (nom.Trim().Length == 0 || nom == null)
            {
                throw new ArgumentNullException("Le nom ne peut pas être vide");
            }

            if (prenom.Trim().Length == 0 || prenom == null)
            {
                throw new ArgumentNullException("Le prénom ne peut pas être vide");
            }

            if (email.Trim().Length == 0 || email == null)
            {
                throw new ArgumentNullException("L'email ne peut pas être vide");
            }

            if (motDePasse.Trim().Length == 0 || motDePasse == null)
            {
                throw new ArgumentNullException("Le mot de passe ne peut pas être vide");
            }

            Nom = nom;
            Prenom = prenom;
            Email = email;
            MotDePasse = motDePasse;
            DateCreation = dateCreation;
            DateModification = dateModification;
        }
    }
}