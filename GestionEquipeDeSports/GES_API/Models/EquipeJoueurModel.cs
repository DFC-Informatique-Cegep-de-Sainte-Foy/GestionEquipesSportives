using GES_Services.Entites;
namespace GES_API.Models
{
    public class EquipeJoueurModel
    {
        public Guid? IdJoueurEquipe { get; set; }
        public Guid? FkIdUtilisateur { get; set; }
        public Guid? FkIdEquipe { get; set; }
        public EquipeJoueurModel()
        {
            ;
        }
        public EquipeJoueurModel(EquipeJoueur p_equipeJoueur)
        {
            this.IdJoueurEquipe = p_equipeJoueur.IdJoueurEquipe;
            this.FkIdEquipe = p_equipeJoueur.FkIdEquipe;
            this.FkIdUtilisateur = p_equipeJoueur.FkIdUtilisateur;
        }
        public EquipeJoueur DeModelVersEntite()
        {
            return new EquipeJoueur(this.IdJoueurEquipe, this.FkIdEquipe, this.FkIdUtilisateur);
        }
    }
}
