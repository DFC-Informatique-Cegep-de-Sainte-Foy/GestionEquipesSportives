using GES_Services.Entites;

namespace GES_API.Models
{
    public class UtilisateurEquipeRoleModel
    {
        public Guid IdUtilisateurEquipeRole { get; set; }
        public Guid FkIdUtilisateur { get; set; }
        public Guid FkIdEquipe { get; set; }
        public int FkIdRole { get; set; }

        public UtilisateurEquipeRoleModel()
        {
            ;
        }

        public UtilisateurEquipeRoleModel(UtilisateurEquipeRole p_utilisateurEquipeModel)
        {
            this.FkIdEquipe = p_utilisateurEquipeModel.FkIdEquipe;
            this.FkIdUtilisateur = p_utilisateurEquipeModel.FkIdUtilisateur;
            this.FkIdRole = p_utilisateurEquipeModel.FkIdRole;
        }

        public UtilisateurEquipeRole DeModelVersEntite()
        {
            return new UtilisateurEquipeRole(this.FkIdUtilisateur, this.FkIdEquipe, this.FkIdRole);
        }
    }
}
