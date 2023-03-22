using System;
using System.Collections.Generic;

namespace GES_DAL.Models
{
    public partial class EquipeEvenement
    {
        public Guid IdEquipeEvenement { get; set; }
        public Guid? FkIdEquipe { get; set; }
        public Guid? FkIdEvenement { get; set; }

        public virtual Equipe? FkIdEquipeNavigation { get; set; }
        public virtual Evenement? FkIdEvenementNavigation { get; set; }
    }
}
