using System;
using System.Collections.Generic;

namespace GES_API.BackendProject
{
    public partial class EquipeEvenement
    {
        public Guid IdEquipeEvenement { get; set; }
        public Guid FkIdEquipe { get; set; }
        public Guid FkIdEvenement { get; set; }

        public virtual Equipe FkIdEquipeNavigation { get; set; } = null!;
        public virtual Evenement FkIdEvenementNavigation { get; set; } = null!;
    }
}
