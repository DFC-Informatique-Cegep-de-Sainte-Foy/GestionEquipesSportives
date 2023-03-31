using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GES_Services.Entites;
using GES_Services.Manipulations;
using GES_API.Models;


namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntraineurController : ControllerBase
    {
        private ManipulationDepotUtilisateur  m_maniulationDepotUtilisateur;
        public EntraineurController(ManipulationDepotUtilisateur p_maniulationDepotUtilisateur)
        {
            this.m_maniulationDepotUtilisateur = p_maniulationDepotUtilisateur;
        }

        // GET: api/<EntraineurController>
        [HttpGet]
        [ProducesResponseType(200)]
        public ActionResult<IEnumerable<UtilisateurModel>> Get()
        {
            List<UtilisateurModel> utilisateurs = new List<UtilisateurModel>();

            foreach (var utilisateur in this.m_maniulationDepotUtilisateur.ListerUtilisateurs())
            {
                utilisateurs.Add(new UtilisateurModel(utilisateur));
            }

            return Ok(utilisateurs);
        }

        // GET api/<EntraineurController>/5
        [HttpGet("{id}")]        
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public ActionResult<UtilisateurModel> Get(Guid id)
        {
            UtilisateurModel utilisateurModel = new UtilisateurModel(this.m_maniulationDepotUtilisateur.ChercherUtilisateurParId(id));

            if(utilisateurModel != null)
            {
                return utilisateurModel;
            }

            return NotFound();            
        }

        // POST api/<EntraineurController>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public ActionResult Post([FromBody] UtilisateurModel p_utilisateurModel)
        {

            if (p_utilisateurModel == null)
            {
                throw new ArgumentNullException(nameof(p_utilisateurModel));
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            p_utilisateurModel.EstEntraineur = true;

            GES_Services.Entites.Utilisateur utilisateurEnt = p_utilisateurModel.DeModelVersEntite();

            this.m_maniulationDepotUtilisateur.AjouterUtilisateur(utilisateurEnt);

            return CreatedAtAction(nameof(Get), new { id = p_utilisateurModel.IdUtilisateur }, p_utilisateurModel);
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
            UtilisateurModel utilisateurModel = new UtilisateurModel(m_maniulationDepotUtilisateur.ChercherUtilisateurParId(id));
            if (utilisateurModel is null)
            {
                return NotFound();
            }
            m_maniulationDepotUtilisateur.ModifierUtilisateur(p_utilisateurModel.DeModelVersEntite());
            
            return NoContent();
        }

        // DELETE api/<EntraineurController>/5
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public ActionResult Delete(Guid id)
        {
            UtilisateurModel utilisateurModel = new UtilisateurModel(m_maniulationDepotUtilisateur.ChercherUtilisateurParId(id));
            if (utilisateurModel is null)
            {
                return NotFound();
            }

            m_maniulationDepotUtilisateur.SupprimerUtilisateur(utilisateurModel.DeModelVersEntite());

            return NoContent();
        }
    }
}
