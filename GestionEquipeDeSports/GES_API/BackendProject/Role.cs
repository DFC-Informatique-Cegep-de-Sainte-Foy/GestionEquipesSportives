using System;
using System.Collections.Generic;

namespace GES_API.BackendProject
{
    public partial class Role
    {
        public Role()
        {
            Utilisateurs = new HashSet<Utilisateur>();
        }

        public int IdRole { get; set; }
        public string Description { get; set; } = null!;

        public virtual ICollection<Utilisateur> Utilisateurs { get; set; }
    }
}
