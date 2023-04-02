﻿using System;
using System.Collections.Generic;

namespace GES_Services.Entites;
public partial class Utilisateur
{
    //regex pour email
    //    string email = "example@email.com";

    //if (Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
    //{
    //    Console.WriteLine("Email valide");
    //}
    //else
    //{
    //    Console.WriteLine("Email invalide");
    //}
    public Guid IdUtilisateur { get; private set; }
    public string? Nom { get; private set; }
    public string? Prenom { get; private set; }
    public int? Age { get; private set; }
    public string? Email { get; private set; }
    public string? Adresse { get; private set; }
    public string? NumTelephone { get; private set; }
    public int? IdRole { get; private set; }
    /*public bool? EstJoueur { get; private set; }
    public bool? EstTuteur { get; private set; }
    public bool? EstEntraineur { get; private set; }
    public bool? EstAdmin { get; private set; }*/
    public DateTime? DateCreation { get; private set; }
    public DateTime? DateModification { get; private set; }
    public bool? FK_Id_Etat { get; private set; }

    /*public Utilisateur(Guid guid, string nom, string prenom, int? age, string email, string adresse, string numTelephone,
                   bool? estJoueur, bool? estTuteur, bool? estEntraineur, bool? estAdmin)*/
    public Utilisateur(Guid guid, string nom, string prenom, int? age, string email, string adresse, string numTelephone, int? idRole)
    {
        if (guid == Guid.Empty)
        {
            IdUtilisateur = Guid.NewGuid();
        }
        else
        {
            IdUtilisateur = guid;
        }

        if (nom == null)
        {
            throw new ArgumentNullException($"Le parametre nom: {nom} est invalide", nameof(nom));
        }
       
        
        if (prenom == null)
        {
            throw new ArgumentNullException($"Le parametre prenom: {prenom} est invalide", nameof(prenom));
        }
        

        if (email == null)
        {
            throw new ArgumentNullException($"Le parametre email: {email} est invalide", nameof(email));
        }
       

        if (adresse == null)
        {
            throw new ArgumentNullException($"Le parametre email: {email} est invalide", nameof(email));
        }
        if (numTelephone == null)
        {
            throw new ArgumentNullException($"Le parametre numero telephone: {numTelephone} est invalide", nameof(numTelephone));
        }

        //DateCreation = DateTime.Now;
        //DateModification = DateTime.Now;
        /*EstEntraineur = estEntraineur ?? false;
        EstJoueur = estJoueur ?? false;
        EstTuteur = estTuteur ?? false;
        EstAdmin = estAdmin ?? false;*/

        Nom = nom;
        Prenom = prenom;
        Age = age;
        Email = email;
        NumTelephone = numTelephone;
        Adresse = adresse;
        IdRole = idRole;        
        FK_Id_Etat = true;
    }


    public Utilisateur(Guid guid, string nom, string prenom, int? age, string email, string adresse,string numTelephone, int? idRole, bool? etat)
    {
        this.IdUtilisateur= guid;
        this.Nom = nom;
        this.Prenom = prenom;
        this.Age = age;
        this.Email = email;            
        this.Adresse = adresse;
        this.NumTelephone = numTelephone;
        this.IdRole = idRole;
        this.FK_Id_Etat = etat;
    }
}