using System;
using System.Collections.Generic;
using GES_Services.Entites;

namespace GES_Services.Entites
{
    public partial class EquipeEvenement
    {
        public Guid IdConnEquipeEvenement { get; set; }
        public Guid? FkIdEquipe { get; set; }
        public Guid? FkIdEvenement { get; set; }
    }
}
