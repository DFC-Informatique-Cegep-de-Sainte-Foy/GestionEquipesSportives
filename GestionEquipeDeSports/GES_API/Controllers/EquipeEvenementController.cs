using GES_API.Models;
using GES_Services.Manipulations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipeEvenementController : ControllerBase
    {
        private ManipulationDepotEquipeEvenement m_manipulationDepotEquipeEvenement;
        public EquipeEvenementController(ManipulationDepotEquipeEvenement p_manipulationDepotEquipeEvenement)
        {
            if(p_manipulationDepotEquipeEvenement == null)
            {
                throw new ArgumentNullException(nameof(p_manipulationDepotEquipeEvenement));
            }
            this.m_manipulationDepotEquipeEvenement = p_manipulationDepotEquipeEvenement;
        }

        //GET: api/<EquipeEvenementController>
        [HttpGet]
        [ProducesResponseType(200)]
        public ActionResult<IEnumerable<EquipeEvenementModel>> Get()
        {
            return Ok(this.m_manipulationDepotEquipeEvenement.ListerEquipeEvenement());
        }

        //GET: api/<EquipeEvenementController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<EquipeEvenementModel> Get(Guid p_id)
        {
            EquipeEvenementModel model = new EquipeEvenementModel(this.m_manipulationDepotEquipeEvenement.ChercherEquipeEvenementParId(p_id));
            if(model != null)
            {
                return Ok(model);
            }
            else
            {
                return NotFound();
            }
        }

        //POST: api/<EquipeEvenementController>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public IActionResult Post([FromBody] EquipeEvenementModel p_equipeEvenementModel)
        {
            return BadRequest();
        }
    }
}
