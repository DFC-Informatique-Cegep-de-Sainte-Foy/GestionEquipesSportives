using System;
using System.Collections.Generic;

namespace GES_Services.Entites
{
    public partial class EquipeJoueur
    {


        public Guid? IdJoueurEquipe { get; set; }
        public Guid? FkIdUtilisateur { get; set; }
        public Guid? FkIdEquipe { get; set; }

        public EquipeJoueur(Guid? idJoueurEquipe, Guid? fkIdUtilisateur, Guid? fkIdEquipe)
        {
            IdJoueurEquipe = idJoueurEquipe;
            FkIdUtilisateur = fkIdUtilisateur;
            FkIdEquipe = fkIdEquipe;
        }
    }
}