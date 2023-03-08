using Microsoft.AspNetCore.Mvc;
using GES_Services.Manipulations;
using GES_API.Models;
using System.Diagnostics.CodeAnalysis;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GES_API.Controllers
{
    [Route("api/Evenements")]
    [ApiController]
    public class EvenementController : ControllerBase
    {
        
        private ManiulationDepotEvenement m_maniulationDepotEvenement;
        public EvenementController(ManiulationDepotEvenement p_maniulationDepotEvenement)
        {
            this.m_maniulationDepotEvenement = p_maniulationDepotEvenement;
        }
        // GET: api/<EvenementController>
        [HttpGet]
        [ProducesResponseType(200)]
        public ActionResult<IEnumerable<EvenementModel>> Get()
        {
            return Ok(this.m_maniulationDepotEvenement.ListerEvenements);
        }

        // GET api/<EvenementController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public ActionResult<EvenementModel> Get(int id)
        {
            EvenementModel model = new EvenementModel(this.m_maniulationDepotEvenement.ChercherEvenementParId(id));
            if (model != null)
            {
                return Ok(model);
            }
            return NotFound();
        }

        // POST api/<EvenementController>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public ActionResult Post([FromBody] EvenementModel p_evenementModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            m_maniulationDepotEvenement.AjouterEvenement(p_evenementModel.VersEntite());
            return Ok();
        }

        // PUT api/<EvenementController>/5
        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public ActionResult Put(int p_id, [FromBody] EvenementModel p_evenementModel)
        {
            if (!ModelState.IsValid || p_evenementModel.Id != p_id)
            {
                return BadRequest();
            }
            EvenementModel model = new EvenementModel(m_maniulationDepotEvenement.ChercherEvenementParId(p_id));
            if (model is null)
            {
                return NotFound();
            }
            m_maniulationDepotEvenement.ModifierEvenement(p_evenementModel.VersEntite());
            return NoContent();
        }

        // DELETE api/<EvenementController>/5
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public ActionResult Delete(int p_id)
        {
            EvenementModel model = new EvenementModel(m_maniulationDepotEvenement.ChercherEvenementParId(p_id));
            if (model is null)
            {
                return NotFound();
            }

            m_maniulationDepotEvenement.SupprimerEvenement(model.VersEntite());
            return NoContent();
        }
    }
}
