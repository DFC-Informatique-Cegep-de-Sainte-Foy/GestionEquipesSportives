using GES_Services.Entites;
using GES_Services.Interfaces;

namespace GES_Services.Manipulations
{
    public class ManipulationDepotUtilisateur
    {
        private IDepotUtilisateur _depotUtilisateur;

        public ManipulationDepotUtilisateur(IDepotUtilisateur depotUtilisateur)
        {
            _depotUtilisateur = depotUtilisateur;
        }

        public void AjouterUtilisateur(Utilisateur utilisateur)
        {
            if (utilisateur is null)
            {
                throw new ArgumentNullException("L'utilisateur ne peut pas être null", nameof(utilisateur));
            }
            
            _depotUtilisateur.AjouterUtilisateur(utilisateur);
        }

        public void ModifierUtilisateur(Utilisateur utilisateur)
        {
            if (utilisateur is null)
            {
                throw new ArgumentNullException("L'utilisateur ne peut pas être null", nameof(utilisateur));
            }
            
            _depotUtilisateur.ModifierUtilisateur(utilisateur);
        }

        public void SupprimerUtilisateur(Utilisateur utilisateur)
        {
            if (utilisateur is null)
            {
                throw new ArgumentNullException("L'utilisateur ne peut pas être null", nameof(utilisateur));
            }
            
            _depotUtilisateur.SupprimerUtilisateur(utilisateur);
        }

        public Utilisateur ChercherUtilisateurParId(int id)
        {            
            return _depotUtilisateur.ChercherUtilisateurParId(id);
        }
    }
}