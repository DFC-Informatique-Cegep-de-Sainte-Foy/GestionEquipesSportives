using GES_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GES_DAL.BackendProject;
using GES_DAL.DbContexts;


namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvenementJoueurPresenceController : ControllerBase
    {
        private Equipe_sportiveContext m_context;

        public EvenementJoueurPresenceController(Equipe_sportiveContext context)
        {
            m_context = context;
        }

        //GET: api/<EvenementJoueurPresenceController>/id
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<bool> Get(Guid id, [FromQuery] string yourParam )
        {
            //valide if the id is valid           
            if (id == Guid.Empty )
            {
                return BadRequest();
            }
            string g = yourParam;

            //validate if the event exists in Evenements table    
            if (m_context.Evenements.Find(id) == null)
            {
                return NotFound();
            }

            Utilisateur? utilisateur = m_context.Utilisateurs.FirstOrDefault(u => u.Email == yourParam);

            // Check if the user was found
            if (utilisateur == null)
            {
                return NotFound(); // Or return another appropriate response
            }

            //trouver la ligne ou utilisateur.id et le parametre id sont les memes dans la table EvenementJoueur
            EvenementJoueur? evenementJoueurDAL = this.m_context.EvenementJoueurs.Where(e => e.Fk_Id_Evenement == id && e.Fk_Id_Utilisateur == utilisateur.IdUtilisateur).FirstOrDefault();

            if(evenementJoueurDAL == null)
            {
                return NotFound();
            }

            return Ok(evenementJoueurDAL.EstPresentAevenement);
        }

        //PUT: api/<EvenementJoueurController>/id
        [HttpPut("{id}")]
        [ProducesResponseType(203)]
        [ProducesResponseType(400)]
        public ActionResult<bool> Put(Guid id, [FromBody] EvenementJoueurModel p_evenementJoueurModel)
        {
            if (p_evenementJoueurModel == null)
            {
                return BadRequest();
            }

            EvenementJoueur? ej = m_context.EvenementJoueurs.Find(id);

            if (ej == null)
            {
                return NotFound();
            }

            // Map the properties of the incoming model to the existing object
            ej.Fk_Id_Evenement = p_evenementJoueurModel.Fk_Id_Evenement;
            ej.Fk_Id_Utilisateur = p_evenementJoueurModel.Fk_Id_Utilisateur;
            ej.EstPresentAevenement = p_evenementJoueurModel.EstPresentAevenement;


            m_context.SaveChanges();

            return Ok();
        }
    }
}
