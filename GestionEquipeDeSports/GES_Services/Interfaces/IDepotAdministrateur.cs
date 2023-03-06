using GES_Services.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Interfaces
{
    public interface IDepotAdministrateur
    {
        public bool AjouterAdministrateur(Administrateur administrateur);
        public bool ModifierAdministrateur(Administrateur administrateur);
        public bool SupprimerAdministrateur(Administrateur administrateur);
        public Administrateur ChercherAdministrateurParId(int id);
    }
}
