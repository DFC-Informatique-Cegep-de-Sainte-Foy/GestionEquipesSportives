using GES_Services.Manipulations;
using Microsoft.AspNetCore.Mvc;
using GES_API.Models;
using System.Collections.Generic;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
        [HttpGet("{id}")]
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

        // POST api/<EquipeController>

        // PUT api/<EquipeController>/5

        // DELETE api/<EquipeController>/5
    }
}
