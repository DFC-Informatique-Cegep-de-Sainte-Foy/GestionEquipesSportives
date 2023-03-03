namespace GestionEquipeDeSports.Services
{
    public abstract class Utilisateur
    {
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; }
        public string MotDePasse { get; set; }
        public string Telephone { get; set; }
        public string Adresse { get; set; }
        public string Ville { get; set; }
        public string Province { get; set; }
        public string CodePostal { get; set; }
        public string Pays { get; set; }
        public string Role { get; set; }

        public Utilisateur()
        {

        }

        public Utilisateur(string nom, string prenom, string email, string motDePasse, string telephone, string adresse, string ville, string province, string codePostal, string pays, string role)
        {
            Nom = nom;
            Prenom = prenom;
            Email = email;
            MotDePasse = motDePasse;
            Telephone = telephone;
            Adresse = adresse;
            Ville = ville;
            Province = province;
            CodePostal = codePostal;
            Pays = pays;
            Role = role;
        }

        public override string ToString()
        {
            return $"Nom : {Prenom} {Nom}, role : {Role}";
        }
    }
}
