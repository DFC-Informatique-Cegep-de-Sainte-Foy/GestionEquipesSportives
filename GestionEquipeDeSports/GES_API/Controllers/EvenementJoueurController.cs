﻿using Microsoft.AspNetCore.Mvc;
using GES_API.Models;
using GES_Services.Manipulations;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvenementJoueurController : ControllerBase
    {
        private ManipulationDepotEvenementJoueur m_manipulationDepotEvenementJoueur;
        
        public EvenementJoueurController(ManipulationDepotEvenementJoueur p_manipulationDepotEvenementJoueur)
        {
            if(p_manipulationDepotEvenementJoueur == null)
            {
                throw new ArgumentNullException(nameof(p_manipulationDepotEvenementJoueur));
            }
            
            this.m_manipulationDepotEvenementJoueur = p_manipulationDepotEvenementJoueur;
        }

        //GET: api/<EvenementJoueurController>/5
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<EvenementJoueurModel> Get([FromBody] EvenementJoueurModel p_evenementJoueurModel ) 
        {
            if (p_evenementJoueurModel == null)
            {
                return BadRequest();
            }

            EvenementJoueurModel evemementModel = new EvenementJoueurModel(this.m_manipulationDepotEvenementJoueur.ChercherJoueurParIdEvenementIdJoueur(p_evenementJoueurModel.DeModelVersEntite()));

            if (evemementModel == null)
            {
                return NotFound();
            }

            return evemementModel;
        }


        //Put api/<EvenementJoueurController>/5
        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult Put(Guid id, [FromBody] EvenementJoueurModel p_evenementJoueurModel)
        {
            if (p_evenementJoueurModel == null)
            {
                return BadRequest();
            }
            try
            {
                this.m_manipulationDepotEvenementJoueur.AjouterPresencePourJoueur(p_evenementJoueurModel.DeModelVersEntite());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            return Ok();
        }
    }
}
