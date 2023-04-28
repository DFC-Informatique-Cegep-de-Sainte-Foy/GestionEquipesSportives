using GES_Services.Manipulations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GES_DAL.BackendProject;
using GES_DAL.DbContexts;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipeJoueurEvenementController : ControllerBase
    {
        private Equipe_sportiveContext m_contexte;
        private ManipulationDepotEvenementJoueur m_manipulationDepotEvenementJoueur;
        private ManipulationDepotEvenementEquipe m_manipulationDepotEvenementEquipe;
        private ManipulationDepotEquipeJoueur m_manipulationDepotEquipeJoueur;

        public EquipeJoueurEvenementController(ManipulationDepotEvenementJoueur manipulationDepotEvenementJoueur, ManipulationDepotEvenementEquipe manipulationDepotEvenementEquipe, ManipulationDepotEquipeJoueur manipulationDepotEquipeJoueur)
        {
            if (manipulationDepotEquipeJoueur is null)
            {
                throw new ArgumentNullException(nameof(manipulationDepotEquipeJoueur));
            }

            if (manipulationDepotEvenementEquipe is null)
            {
                throw new ArgumentNullException(nameof(manipulationDepotEvenementEquipe));
            }

            if (manipulationDepotEvenementJoueur is null)
            {
                throw new ArgumentNullException(nameof(manipulationDepotEvenementJoueur));
            }

            m_manipulationDepotEvenementJoueur = manipulationDepotEvenementJoueur;
            m_manipulationDepotEvenementEquipe = manipulationDepotEvenementEquipe;
            m_manipulationDepotEquipeJoueur = manipulationDepotEquipeJoueur;
        }



        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult Get(Guid id, [FromQuery] Guid idEvenement)
        {
            List<EvenementJoueur> joueurs = new List<EvenementJoueur>();
            ////lister les evenements pour l'id 
            //m_contexte.EvenementJoueurs.Where(e => e.Fk_Id_Evenement == id).ToList();
            //foreach (var item in m_contexte.EvenementJoueurs.Where(e => e.Fk_Id_Evenement == id).ToList())
            //{
            //    Evenements.Add(item);
            //}

            foreach (var item in m_contexte.EvenementJoueurs.Where(e => e.Fk_Id_Evenement == idEvenement).ToList())
            {
                joueurs.Add(item);
            }
            

            return BadRequest();
        }
    }
}
