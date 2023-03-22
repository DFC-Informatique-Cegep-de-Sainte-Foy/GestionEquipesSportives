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
        public bool AjouterUtilisateur(Utilisateur utilisateur);
        public bool ModifierUtilisateur(Utilisateur utilisateur);
        public bool SupprimerUtilisateur(Utilisateur utilisateur);
        public Utilisateur ChercherUtilisateurParId(int id);
    }
}
