using GES_Services.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace GES_Services.Interfaces
{
    public interface IDepotUtilisateur
    {
        public void AjouterUtilisateur(Utilisateur utilisateur);
        public void ModifierUtilisateur(Utilisateur utilisateur);
        public void SupprimerUtilisateur(Utilisateur utilisateur);
        public Utilisateur ChercherUtilisateurParId(Guid id);
        public IEnumerable<Utilisateur> ListerUtilisateurs();
        public Utilisateur ChercherUtilisateurParEmail(String email);
    }
}
