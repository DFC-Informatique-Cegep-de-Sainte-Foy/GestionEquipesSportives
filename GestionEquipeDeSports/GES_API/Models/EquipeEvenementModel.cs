using GES_Services.Entites;

namespace GES_API.Models
{
    public class EquipeEvenementModel
    {
        public Guid IdEquipeEvenement { get; set; }
        public Guid? FkIdEquipe { get; set; }
        public Guid? FkIdEvenement { get; set; }
        public EquipeEvenementModel()
        {
            ;
        }
        public EquipeEvenementModel(EquipeEvenement p_equipeEvenement)
        {
            this.IdEquipeEvenement = p_equipeEvenement.IdConnEquipeEvenement;
            this.FkIdEquipe = p_equipeEvenement.FkIdEquipe;
            this.FkIdEvenement = p_equipeEvenement.FkIdEvenement;
        }
        public EquipeEvenement DeModelVersEntite()
        {
            return new EquipeEvenement(this.IdEquipeEvenement, this.FkIdEquipe, this.FkIdEvenement);
        }
    }
}
