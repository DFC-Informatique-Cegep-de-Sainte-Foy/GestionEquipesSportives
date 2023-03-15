using GES_API.Models;
using GES_Services.Entites;
using GES_Services.Manipulations;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GES_API.Controllers
{
    [Route("api/csv/evenements")]
    [ApiController]
    public class EvenementCSVController : ControllerBase
    {
        ManipulationDepotImporationEvenementCSV _ManipulationDepotImporationEvenementCSV;
        public EvenementCSVController(ManipulationDepotImporationEvenementCSV manipulationDepotImporationEvenementCSV)
        {
            _ManipulationDepotImporationEvenementCSV = manipulationDepotImporationEvenementCSV;
        }

        // POST api/<EvenementCSV>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public void Post(string p_nomFichier)
        {
            
            List<Evenement> evenements = new List<Evenement>();
            evenements = (List<Evenement>)_ManipulationDepotImporationEvenementCSV.LireEvenements(p_nomFichier);
            _ManipulationDepotImporationEvenementCSV.AjouterEvenements(evenements);
        }

    }
}
