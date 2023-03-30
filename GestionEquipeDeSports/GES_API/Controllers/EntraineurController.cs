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
        public void Post([FromBody] UtilisateurModel p_utilisateurModel)
        {
            


        }

        // PUT api/<EntraineurController>/5
        [HttpPut("{id}")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<EntraineurController>/5
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public void Delete(int id)
        {
        }
    }
}
