using System;
using System.Collections.Generic;

namespace GES_Services.Entites
{
    public partial class EquipeJoueur
    {
        public Guid IdConnJoueurEquipe { get; set; }
        public Guid? Id { get; set; }
        public Guid? FkIdEquipe { get; set; }
        public int? FkIdRoles { get; set; }
    }
}
