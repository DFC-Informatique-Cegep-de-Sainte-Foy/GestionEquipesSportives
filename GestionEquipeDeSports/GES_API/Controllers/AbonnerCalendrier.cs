using Microsoft.AspNetCore.Mvc;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AbonnerCalendrier : ControllerBase
    {
        // Get: api/<AbonnerCalendrierController/5
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult Get()
        {
            return Ok();
        }
    }
}
