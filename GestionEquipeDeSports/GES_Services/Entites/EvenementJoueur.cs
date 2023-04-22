using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Entites
{
    public class EvenementJoueur
    {
        public Guid? IdEvenementJoueur { get; set; }
        public bool EstPresentAevenement { get; set; }
        public Guid? Fk_Id_Evenement { get; set; }
        public Guid? Fk_Id_Utilisateur { get; set; }
        public EvenementJoueur()
        {
            ;
        }
        public EvenementJoueur(bool estPresentAevenement, Guid? fk_Id_Evenement, Guid? fk_Id_Utilisateur)
        {
            EstPresentAevenement = estPresentAevenement;
            Fk_Id_Evenement = fk_Id_Evenement;
            Fk_Id_Utilisateur = fk_Id_Utilisateur;
        }
        public EvenementJoueur(Guid? p_idEvenementJoueur,bool estPresentAevenement, Guid? fk_Id_Evenement, Guid? fk_Id_Utilisateur)
        {
            IdEvenementJoueur = p_idEvenementJoueur;
            EstPresentAevenement = estPresentAevenement;
            Fk_Id_Evenement = fk_Id_Evenement;
            Fk_Id_Utilisateur = fk_Id_Utilisateur;
        }
    }
}
