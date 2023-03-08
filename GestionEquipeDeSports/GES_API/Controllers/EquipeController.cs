using Microsoft.AspNetCore.Mvc;
using GES_Services.Manipulations;
using GES_API.Models;

namespace GES_API.Controllers
{
    [Route("api/Equipe")]
    [ApiController]
    public class EquipeController : ControllerBase
    {
        private ManipulationDepotEquipe m_manipulationDepotEquipe;
        public EquipeController(ManipulationDepotEquipe p_manipulationDepotEquipe)
        {
            this.m_manipulationDepotEquipe = p_manipulationDepotEquipe;
        }

        //GET: api/<EquipeController>
        [HttpGet]
        [ProducesResponseType(200)]
        public ActionResult<IEnumerable<EquipeModel>> Get()
        {
            return Ok(this.m_manipulationDepotEquipe.ListerEquipe);
        }

        //Get: api/<EquipeController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<EquipeModel> Get(int id)
        {
            EquipeModel model = new EquipeModel(this.m_manipulationDepotEquipe.ChercherEquipeParId(id));
            if(model != null)
            {
                return Ok(model);
            }
            else { return NotFound(); }
        }
    }
}
