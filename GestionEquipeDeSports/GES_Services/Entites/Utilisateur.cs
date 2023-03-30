using System;
using System.Collections.Generic;

namespace GES_Services.Entites;
public partial class Utilisateur
{
    public Guid IdUtilisateur { get; private set; }
    public string? Nom { get; private set; }
    public string? Prenom { get; private set; }
    public int Age { get; private set; }
    public string? Email { get; private set; }
    public string? Adresse { get; private set; }
    public string? NumTelephone { get; private set; }
    public DateTime? DateCreation { get; private set; }
    public DateTime? DateModification { get; private set; }
    public bool? EstJoueur { get; private set; }
    public bool? EstTuteur { get; private set; }
    public bool? EstEntraineur { get; private set; }
    public bool? EstAdmin { get; private set; }
    public bool? Etat { get; private set; }

    public Utilisateur(Guid guid, string nom, string prenom, int age, string email, string adresse, string numTelephone,
                   bool? estJoueur, bool? estTuteur, bool? estEntraineur, bool? estAdmin)
    {

        if (guid == null)
        {
            throw new ArgumentNullException(nameof(guid));
        }
        IdUtilisateur = guid;
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
        if (adresse == null)
        {
            throw new ArgumentNullException($"Le parametre email: {email} est invalide", nameof(email));
        }
        Adresse = adresse;
        if (numTelephone == null)
        {
            throw new ArgumentNullException($"Le parametre numero telephone: {numTelephone} est invalide", nameof(numTelephone));
        }

        NumTelephone = numTelephone;

        DateCreation = DateTime.Now;
        DateModification = DateTime.Now;

        Age = age;
        EstJoueur = estJoueur;
        EstTuteur = estTuteur;
        EstEntraineur = estEntraineur;
        EstAdmin = estAdmin;
        Etat = true;
    }


    public Utilisateur(Guid guid, string nom, string prenom, int age, string email, string adresse,
                        string numTelephone, bool etat)
    {

    }
}