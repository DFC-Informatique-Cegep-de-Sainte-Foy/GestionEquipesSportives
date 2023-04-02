using System;
using System.Collections.Generic;

namespace GES_DAL.BackendProject
{
    public partial class EquipeEvenement
    {
        public Guid IdEquipeEvenement { get; set; }
        public Guid? FkIdEquipe { get; set; }
        public Guid? FkIdEvenement { get; set; }

        public virtual Equipe FkIdEquipeNavigation { get; set; } = null!;
        public virtual Evenement FkIdEvenementNavigation { get; set; } = null!;

        public EquipeEvenement()
        {
            ;
        }

        public EquipeEvenement(GES_Services.Entites.EquipeEvenement p_equipeEvenement)
        {
            this.IdEquipeEvenement = p_equipeEvenement.IdConnEquipeEvenement;
            this.FkIdEquipe = p_equipeEvenement.FkIdEquipe;
            this.FkIdEvenement = p_equipeEvenement.FkIdEvenement;
        }
        public GES_Services.Entites.EquipeEvenement DeDTOVersEntite()
        {
            return new GES_Services.Entites.EquipeEvenement(IdEquipeEvenement, FkIdEquipe, FkIdEvenement);
        }
    }
}
