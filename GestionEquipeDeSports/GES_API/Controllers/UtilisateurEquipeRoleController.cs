using Microsoft.AspNetCore.Mvc;
using GES_Services.Manipulations;
using GES_API.Models;


namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilisateurEquipeRoleController : ControllerBase
    {
        private ManipulationUtilisateurEquipeRole m_manipulationUtilisateurEquipeRole;

        public UtilisateurEquipeRoleController(ManipulationUtilisateurEquipeRole manipulationUtilisateurEquipeRole)
        {
            if (manipulationUtilisateurEquipeRole is null)
            {
                throw new ArgumentNullException(nameof(manipulationUtilisateurEquipeRole));

            }
            m_manipulationUtilisateurEquipeRole = manipulationUtilisateurEquipeRole;
        }


        //GET: api/<UtilisateurEquipeRoleControlle>/5
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]


    }
}
