﻿using GES_API.Models;
using GES_Services.Manipulations;
using Microsoft.AspNetCore.Mvc;
using GES_Services.Entites;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipeJoueurController : ControllerBase
    {
        private ManipulationDepotEquipeJoueur m_manipulationDepotEquipeJoueur;

        public EquipeJoueurController(ManipulationDepotEquipeJoueur p_manipulationEquipeJoueur)
        {
            this.m_manipulationDepotEquipeJoueur = p_manipulationEquipeJoueur;
        }

        //GET: api/<EquipeJoueurController>
        [HttpGet]
        [ProducesResponseType(200)]
        public ActionResult<IEnumerable<EquipeJoueurModel>> Get()
        {
            throw new NotImplementedException();
        }

        //GET: api/<EquipeJoueurController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<UtilisateurModel>> Get(Guid id)
        {
            IEnumerable<UtilisateurModel> listeJoueurs;
            try
            {
                listeJoueurs = this.m_manipulationDepotEquipeJoueur.ListerEquipeJoueurs(id).Select(e => new UtilisateurModel(e));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            if(listeJoueurs != null)
            {
                return Ok(listeJoueurs);
            }
            else
            {
                return NotFound();
            }
        }

        //POST: api/<EquipeJoueurController>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public ActionResult Post([FromBody] EquipeJoueurModel p_equipeJoueurModel)
        {
            if(p_equipeJoueurModel == null)
            {
                throw new ArgumentNullException(nameof(p_equipeJoueurModel));
            }

            EquipeJoueur equipeJoueur = p_equipeJoueurModel.DeModelVersEntite();

            try
            {
                this.m_manipulationDepotEquipeJoueur.AjouterEquipeJoueur(equipeJoueur);
            }

            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            return CreatedAtAction(nameof(Get), new { id = p_equipeJoueurModel.IdJoueurEquipe }, p_equipeJoueurModel);
        }
    }
}
