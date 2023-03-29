using GES_Services.Manipulations;
using Microsoft.AspNetCore.Mvc;
using GES_API.Models;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilisateurController : ControllerBase
    {
        private ManipulationDepotUtilisateur m_manipulationDepotUtilisateur;
        public UtilisateurController(ManipulationDepotUtilisateur p_manipulationDepotUtilisateur)
        {
            if(p_manipulationDepotUtilisateur == null)
            {
                throw new ArgumentNullException(nameof(p_manipulationDepotUtilisateur));
            }
            this.m_manipulationDepotUtilisateur = p_manipulationDepotUtilisateur;
        }
        //Get: api/<UtilisateurController>
        [HttpGet]
        [ProducesResponseType(200)]
        public ActionResult<IEnumerable<UtilisateurModel>> Get()
        {
            return Ok(this.m_manipulationDepotUtilisateur.ListerUtilisateurs());
        }

        //Get: api/<EquipeController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<UtilisateurModel> Get(Guid id)
        {
            UtilisateurModel model = new UtilisateurModel(this.m_manipulationDepotUtilisateur.ChercherUtilisateurParId(id));
            if(model != null)
            {
                return Ok(model);
            }
            else
            {
                return NotFound();
            }
        }

        // POST api/<EquipeController>

        // PUT api/<EquipeController>/5

        // DELETE api/<EquipeController>/5
    }
}
