﻿using GES_API.Models;
using GES_Services.Manipulations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GES_Services.Entites;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
        public IActionResult Post([FromBody] EquipeEvenementModel p_equipeEvenementModel)
        {
            return BadRequest();
        }
    }
}