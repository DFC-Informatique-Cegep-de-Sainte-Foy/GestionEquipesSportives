using System;
using System.Collections.Generic;

namespace GES_DAL.Models
{
    public partial class Role
    {
        public Role()
        {
            EquipeJoueurs = new HashSet<EquipeJoueur>();
        }

        public int IdRole { get; set; }
        public string? Description { get; set; }
        public virtual ICollection<EquipeJoueur> EquipeJoueurs { get; set; }
    }
}
