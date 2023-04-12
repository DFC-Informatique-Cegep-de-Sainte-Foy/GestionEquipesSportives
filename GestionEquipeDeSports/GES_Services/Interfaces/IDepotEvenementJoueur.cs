using GES_Services.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Interfaces
{
    public interface IDepotEvenementJoueur
    {
        public EvenementJoueur ChercherJoueurParIdEvenementIdJoueur(EvenementJoueur p_evenementJoueur);
        public IEnumerable<EvenementJoueur> ChercherJoueurParIdEvenement(Guid p_id);
        public void AjouterPresencePourJoueur(EvenementJoueur p_evenementJoueur);
    }
}
