using Microsoft.AspNetCore.Mvc;
using GES_Services.Manipulations;
using GES_API.Models;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipeController : ControllerBase
    {
        private ManipulationDepotEquipe m_manipulationDepotEquipe;
        public EquipeController(ManipulationDepotEquipe p_manipulationDepotEquipe)
        {
            if(p_manipulationDepotEquipe == null)
            {
                throw new ArgumentNullException(nameof(p_manipulationDepotEquipe));
            }
            this.m_manipulationDepotEquipe = p_manipulationDepotEquipe;
        }

        //GET: api/<EquipeController>
        [HttpGet]
        [ProducesResponseType(200)]
        public ActionResult<IEnumerable<EquipeModel>> Get()
        {
            return Ok(this.m_manipulationDepotEquipe.ListerEquipes());
        }

        //Get: api/<EquipeController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<EquipeModel> Get(Guid id)
        {
            EquipeModel model = new EquipeModel(this.m_manipulationDepotEquipe.ChercherEquipeParId(id));
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
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public ActionResult Post([FromBody] EquipeModel p_equipeModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            this.m_manipulationDepotEquipe.AjouterEquipe(p_equipeModel.DeModelVersEntite());
            return Ok();
        }

        // PUT api/<EquipeController>/5
        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public ActionResult Put(Guid p_id, [FromBody] EquipeModel p_equipeModel)
        {
            if (!ModelState.IsValid || p_equipeModel.IdEquipe != p_id)
            {
                return BadRequest();
            }

            EquipeModel equipeModel = new EquipeModel(this.m_manipulationDepotEquipe.ChercherEquipeParId(p_id));

            if (equipeModel is null)
            {
                return NotFound();
            }

            this.m_manipulationDepotEquipe.ModifierEquipe(p_equipeModel.DeModelVersEntite());

            return NoContent();
        }

        // DELETE api/<EquipeController>/5
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public ActionResult Delete(Guid p_id)
        {
            EquipeModel equipeModel = new EquipeModel(this.m_manipulationDepotEquipe.ChercherEquipeParId(p_id));

            if (equipeModel is null)
            {
                return NotFound();
            }

            this.m_manipulationDepotEquipe.SupprimerEquipe(equipeModel.DeModelVersEntite());

            return NoContent();
        }
    }
}
