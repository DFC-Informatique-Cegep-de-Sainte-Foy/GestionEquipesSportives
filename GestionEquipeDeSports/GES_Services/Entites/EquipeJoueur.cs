using System;
using System.Collections.Generic;

namespace GES_Services.Entites
{
    public partial class EquipeJoueur
    {


        public Guid? IdJoueurEquipe { get; set; }
        public Guid? Fk_Id_Utilisateur { get; set; }
        public Guid? Fk_Id_Equipe { get; set; }

        public EquipeJoueur(Guid? idJoueurEquipe, Guid? fkIdEquipe, Guid? fkIdUtilisateur)
        {
            IdJoueurEquipe = idJoueurEquipe;
            Fk_Id_Utilisateur = fkIdUtilisateur;
            Fk_Id_Equipe = fkIdEquipe;
        }
    }
}