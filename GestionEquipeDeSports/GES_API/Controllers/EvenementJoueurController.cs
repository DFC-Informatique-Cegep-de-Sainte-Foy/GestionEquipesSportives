using Microsoft.AspNetCore.Mvc;
using GES_API.Models;
using GES_Services.Manipulations;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvenementJoueurController : ControllerBase
    {
        private ManipulationDepotEvenementJoueur m_manipulationDepotEvenementJoueur;
        public EvenementJoueurController(ManipulationDepotEvenementJoueur p_manipulationDepotEvenementJoueur)
        {
            if(p_manipulationDepotEvenementJoueur == null)
            {
                throw new ArgumentNullException(nameof(p_manipulationDepotEvenementJoueur));
            }
            this.m_manipulationDepotEvenementJoueur = p_manipulationDepotEvenementJoueur;
        }
    }
}
