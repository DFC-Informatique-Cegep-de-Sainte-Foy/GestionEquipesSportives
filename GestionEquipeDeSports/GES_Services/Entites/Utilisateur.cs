using System;
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
    public DateTime? DateCreation { get; private set; }
    public DateTime? DateModification { get; private set; }
    public bool? Etat { get; private set; }
    public EnumTypeRole Role { get; private set; }
    public Utilisateur(Guid guid, string nom, string prenom, int? age,
                       string email, string adresse, string numTelephone,
                       EnumTypeRole role)
    {
        IdUtilisateur = guid == Guid.Empty ? Guid.NewGuid() : guid;

        if (nom == null)
        {
            throw new ArgumentNullException($"Le parametre nom: {nom} est invalide", nameof(nom));
        }
        Nom = nom;

        if (prenom == null)
        {
            throw new ArgumentNullException($"Le parametre prenom: {prenom} est invalide", nameof(prenom));
        }
        Prenom = prenom;

        if (email == null)
        {
            throw new ArgumentNullException($"Le parametre email: {email} est invalide", nameof(email));
        }
        Email = email;

        if (age == null)
        {
            throw new ArgumentNullException($"Le parametre age: {age} est invalide", nameof(age));
        }
        //if (numTelephone == null)
        //{
        //    throw new ArgumentNullException($"Le parametre numero telephone: {numTelephone} est invalide", nameof(numTelephone));
        //}

        Role = role;

        NumTelephone = numTelephone;
        Adresse = adresse;
        Age = age;
        Etat = true;
    }


    public Utilisateur(Guid guid, string nom, string prenom, int? age, string email, string adresse,
                        string numTelephone, bool? etat)
    {
        this.IdUtilisateur = guid;
        this.Nom = nom;
        this.Prenom = prenom;
        this.Age = age;
        this.Email = email;
        this.Adresse = adresse;
        this.NumTelephone = numTelephone;
        this.Etat = etat;
    }
}