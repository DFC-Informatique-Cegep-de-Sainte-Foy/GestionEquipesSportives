using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Entites
{
    public class UtilisateurEquipeRole
    {
        public Guid IdUtilisateurEquipeRole { get; set; }
        public Guid FkIdUtilisateur { get; set; }
        public Guid FkIdEquipe { get; set; }
        public int FkIdRole { get; set; }

        public UtilisateurEquipeRole()
        {
            ;
        }

        public UtilisateurEquipeRole( Guid p_fkIdUtilisateur, Guid p_fkIdEquipe, int p_fkIdRole)
        {
            this.FkIdUtilisateur = p_fkIdUtilisateur;
            this.FkIdEquipe = p_fkIdEquipe;
            this.FkIdRole = p_fkIdRole;
        }

    }
}
