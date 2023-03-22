using System;
using System.Collections.Generic;

namespace GES_DAL.Models
{
    public partial class TypeEvenement
    {
        public TypeEvenement()
        {
            Evenements = new HashSet<Evenement>();
        }

        public int IdTypeEvenement { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<Evenement> Evenements { get; set; }
    }
}
