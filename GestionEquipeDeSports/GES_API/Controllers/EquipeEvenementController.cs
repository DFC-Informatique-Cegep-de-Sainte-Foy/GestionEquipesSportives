using GES_API.Models;
using GES_Services.Manipulations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GES_Services.Entites;
using Microsoft.AspNetCore.Authorization;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class EquipeEvenementController : ControllerBase
    {
        private ManipulationDepotEquipeEvenement m_manipulationDepotEquipeEvenement;
        public EquipeEvenementController(ManipulationDepotEquipeEvenement p_manipulationDepotEquipeEvenement)
        {
            if (p_manipulationDepotEquipeEvenement == null)
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
            throw new NotImplementedException();
            //return Ok(this.m_manipulationDepotEquipeEvenement.ListerEquipeEvenement());
        }

        //GET: api/<EquipeEvenementController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<EvenementModel>> Get(Guid id)
        {
            IEnumerable<EvenementModel> listeEvenement;
            try
            {
                listeEvenement = this.m_manipulationDepotEquipeEvenement.ListerEquipeEvenements(id).Select(e => new EvenementModel(e));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            if (listeEvenement != null)
            {
                return Ok(listeEvenement);
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
        public ActionResult Post([FromBody] EquipeEvenementModel p_equipeEvenementModel)
        {
            if(p_equipeEvenementModel == null)
            {
                throw new ArgumentNullException(nameof(p_equipeEvenementModel));
            }
            EquipeEvenement equipeEvenement = p_equipeEvenementModel.DeModelVersEntite();
            EquipeEvenement evenementDansEquipe = this.m_manipulationDepotEquipeEvenement.ChercherEvenementDansEquipeEvenement(equipeEvenement);
            if(evenementDansEquipe == null)
            {
                this.m_manipulationDepotEquipeEvenement.AjouterEquipeEvenement(equipeEvenement);
                return CreatedAtAction(nameof(Get), new { id = p_equipeEvenementModel.IdEquipeEvenement }, p_equipeEvenementModel);
            }
            else
            {
                return BadRequest();
            }

            //EquipeEvenementModel model = new EquipeEvenementModel(m_manipulationDepotEquipeEvenement.ChercherEvenementDansEquipeEvenement((Guid)p_equipeEvenementModel.Fk_Id_Evenement));
            //if (model.Fk_Id_Evenement == p_equipeEvenementModel.Fk_Id_Evenement && model.Fk_Id_Equipe == p_equipeEvenementModel.Fk_Id_Equipe)
            //{
            //    return NoContent();                
            //}
            //GES_Services.Entites.EquipeEvenement equipeEvenement = p_equipeEvenementModel.DeModelVersEntite();
            //this.m_manipulationDepotEquipeEvenement.AjouterEquipeEvenement(equipeEvenement);
            //return CreatedAtAction(nameof(Get), new { id = p_equipeEvenementModel.IdEquipeEvenement }, p_equipeEvenementModel);
        }

        //DELETE: api/<EquipeEvenementController
        [HttpDelete]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public ActionResult Delete([FromBody] EquipeEvenementModel p_equipeEvenement)
        {
            if(p_equipeEvenement == null)
            {
                throw new ArgumentNullException(nameof(p_equipeEvenement));
            }
            EquipeEvenement equipeEvenement = p_equipeEvenement.DeModelVersEntite();
            EquipeEvenementModel model = new EquipeEvenementModel(this.m_manipulationDepotEquipeEvenement.ChercherEvenementDansEquipeEvenement(equipeEvenement));
            this.m_manipulationDepotEquipeEvenement.SupprimerEquipeEvenement(model.DeModelVersEntite());
            return NoContent();

            //EquipeEvenementModel model = new EquipeEvenementModel(m_manipulationDepotEquipeEvenement.ChercherEvenementDansEquipeEvenement(id));
            //if (model is null)
            //{
            //    return NotFound();
            //}

            //this.m_manipulationDepotEquipeEvenement.SupprimerEquipeEvenement(model.DeModelVersEntite());
            //return NoContent();
        }
    }
}
