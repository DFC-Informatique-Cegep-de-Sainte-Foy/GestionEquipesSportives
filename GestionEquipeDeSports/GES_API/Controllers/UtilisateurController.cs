using GES_Services.Manipulations;
using Microsoft.AspNetCore.Mvc;
using GES_API.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UtilisateurController : ControllerBase
    {
        private ManipulationDepotUtilisateur m_manipulationDepotUtilisateur;
        public UtilisateurController(ManipulationDepotUtilisateur p_manipulationDepotUtilisateur)
        {
            if (p_manipulationDepotUtilisateur == null)
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
            List<UtilisateurModel> utilisateurModels = null;
            // transfer each item from this this.m_manipulationDepotUtilisateur.ListerUtilisateurs() to the list of models            
            utilisateurModels = this.m_manipulationDepotUtilisateur.ListerUtilisateurs()
                ?.Select(utilisateur => new UtilisateurModel(utilisateur)).ToList();

            return Ok(utilisateurModels);
        }

        //Get: api/<EquipeController>/5
        /*[HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<UtilisateurModel> Get(Guid id)
        {
            UtilisateurModel model = new UtilisateurModel(this.m_manipulationDepotUtilisateur.ChercherUtilisateurParId(id));
            if (model != null)
            {
                return Ok(model);
            }
            else
            {
                return NotFound();
            }
        }
        */

        //Get: api/<EquipeController>/5
        [HttpGet("{email}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<UtilisateurModel> Get(String email)
        {
            UtilisateurModel model = new UtilisateurModel(this.m_manipulationDepotUtilisateur.ChercherUtilisateurParEmail(email));
            if (model != null)
            {
                return Ok(model);
            }
            else
            {
                return NotFound();
            }
        }

        // PUT api/<EntraineurController>/5
        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public ActionResult Put(Guid id, [FromBody] UtilisateurModel p_utilisateurModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            //if (p)
            UtilisateurModel utilisateurModel = new UtilisateurModel(m_manipulationDepotUtilisateur.ChercherUtilisateurParId(id));
            if (utilisateurModel is null)
            {
                return NotFound();
            }
            m_manipulationDepotUtilisateur.ModifierUtilisateur(p_utilisateurModel.DeModelVersEntite());

            return NoContent();
        }

        // DELETE api/<EntraineurController>/5
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public ActionResult Delete(Guid id)
        {
            UtilisateurModel utilisateurModel = new UtilisateurModel(m_manipulationDepotUtilisateur.ChercherUtilisateurParId(id));
            if (utilisateurModel is null)
            {
                return NotFound();
            }

            m_manipulationDepotUtilisateur.SupprimerUtilisateur(utilisateurModel.DeModelVersEntite());

            return NoContent();
        }
    }
}
