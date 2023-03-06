using GES_Services.Entites;
using GES_Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Manipulations
{
    public class ManipulationDepotAdministrateur
    {
        private IDepotAdministrateur _depotAdministrateur;

        public ManipulationDepotAdministrateur(IDepotAdministrateur depotAdministrateur)
        {
            _depotAdministrateur = depotAdministrateur;
        }
        
        public Administrateur ChercherAdministrateurParId(int id)
        {
            //verification de l'existence de l'administrateur
            
            return _depotAdministrateur.ChercherAdministrateurParId(id);
        }

        public bool AjouterAdministrateur(Administrateur administrateur)
        {
            if (administrateur is null)
            {
                throw new ArgumentNullException("L'administrateur ne peut pas être null");
            }
            
            return _depotAdministrateur.AjouterAdministrateur(administrateur);
        }

        public bool ModifierAdministrateur(Administrateur administrateur)
        {
            if (administrateur is null)
            {
                throw new ArgumentNullException("L'administrateur ne peut pas être null");
            }

            return _depotAdministrateur.ModifierAdministrateur(administrateur);
        }

        public bool SupprimerAdministrateur(Administrateur administrateur)
        {
            if (administrateur is null)
            {
                throw new ArgumentNullException("L'administrateur ne peut pas être null");
            }

            return _depotAdministrateur.SupprimerAdministrateur(administrateur);
        }
    }
}
