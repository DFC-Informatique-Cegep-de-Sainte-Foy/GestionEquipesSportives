using GES_DAL.DbContexts;
using GES_DAL.BackendProject;
using GES_Services.Entites;
using Entite = GES_Services.Entites;
using GES_Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_DAL.Depots
{
    public class DepotEquipeSQLServer : IDepotEquipe
    {
        public Equipe_sportiveContext m_context;
        public DepotEquipeSQLServer(Equipe_sportiveContext p_context)
        {
            if (p_context is null)
            {
                throw new ArgumentNullException(nameof(p_context));
            }

            this.m_context = p_context;
        }

        public void AjouterEquipe(Entite.Equipe p_equipe)
        {
            if (p_equipe is null)
            {
                throw new ArgumentNullException($"le parametre {p_equipe} ne peut pas etre null", nameof(p_equipe));
            }

            if (m_context.Equipes.Any(e => e.IdEquipe == p_equipe.IdEquipe))
            {
                throw new InvalidOperationException($"l'evenement avec le id {p_equipe.IdEquipe} existe déjà");
            }

            //validation des données, si l'equipe existe deja dans la bd, on ne l'ajoute pas
            if (m_context.Equipes.Any(e => e.Nom == p_equipe.Nom
                                   && e.Region == p_equipe.Region
                                   && e.Sport == p_equipe.Sport
                                   && e.AssociationSportive == p_equipe.AssociationSportive))
            {
                throw new InvalidOperationException($"L'équipe avec le nom {p_equipe.Nom} existe déjà.");
            }

            m_context.Equipes.Add(new GES_DAL.BackendProject.Equipe(p_equipe));
            m_context.SaveChanges();
        }

        public Entite.Equipe ChercherEquipeParId(Guid p_id)
        {
            if (p_id == Guid.Empty)
            {
                throw new ArgumentOutOfRangeException("le parametre \"id\" doit etre superieur a 0", nameof(p_id));
            }
            GES_DAL.BackendProject.Equipe? equipeDTO = m_context.Equipes.FirstOrDefault(e => e.IdEquipe == p_id);

            if (equipeDTO is null)
            {
                throw new InvalidOperationException($"l'evenement avec le id {p_id} n'existe pas");
            }

            return equipeDTO.DeDTOVersEntite();
        }

        public IEnumerable<Entite.Equipe> ListerEquipes()
        {
            return this.m_context.Equipes.Where(e => e.Etat == true).Select(e => e.DeDTOVersEntite());
        }

        public void ModifierEquipe(Entite.Equipe p_equipe)
        {
            throw new NotImplementedException();
        }

        public void SupprimerEquipe(Entite.Equipe p_equipe)
        {
            if (p_equipe == null)
            {
                throw new ArgumentNullException(nameof(p_equipe));
            }
            GES_DAL.BackendProject.Equipe? equipeDTO = this.m_context.Equipes.Where(e => e.IdEquipe == p_equipe.IdEquipe).SingleOrDefault();
            if (equipeDTO is null)
            {
                throw new InvalidOperationException($"l'equipe avec l'id {p_equipe.IdEquipe} n'existe pas");
            }
            equipeDTO.Etat = false;
            this.m_context.Equipes.Update(equipeDTO);
            this.m_context.SaveChanges();
        }

        //public IEnumerable<Entite.Equipe> ListerEquipes()
        //{
        //    List<Entite.Equipe> equipes = new List<Entite.Equipe>();

        //    return equipes;
        //}
        //public Entite.Equipe ChercherEquipeParId(Guid p_id)
        //{
        //    //if (!p_id)
        //    //{
        //    //    throw new ArgumentOutOfRangeException("le parametre \"id\" doit etre superieur à 0", nameof(p_id));
        //    //}

        //    GES_DAL.Models.Equipe equipe = this.m_context.Equipes.FirstOrDefault(eDTO => eDTO.IdEquipe == p_id);


        //    if (equipe is null)
        //    {
        //        throw new InvalidOperationException($"l'équipe avec le id {p_id} n'existe pas dans le dépot");
        //    }

        //    return equipe;
        //}
        //public void AjouterEquipe(Entite.Equipe p_equipe)
        //{
        //    if (p_equipe is null)
        //    {
        //        throw new ArgumentNullException("le paramàtre p_equipe ne peut pas être null", nameof(p_equipe));
        //    }

        //    if (this.m_context.Equipes.Any(eDTO => eDTO.Id == p_equipe.Id))
        //    {
        //        throw new InvalidOperationException($"l'équipe avec le id {p_equipe.Id} existe déjà dans le dépot");
        //    }

        //    this.m_context.Equipes.Add(new EquipeDTO(p_equipe));
        //    this.m_context.SaveChanges();
        //}
        //public void ModifierEquipe(Entite.Equipe p_equipe)
        //{
        //    if (p_equipe is null)
        //    {
        //        throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(p_equipe));
        //    }

        //    if (!this.m_context.Evenements.Any(eDTO => eDTO.Id == p_equipe.Id))
        //    {
        //        throw new InvalidOperationException($"l'evenement avec le id {p_equipe.Id} n'existe pas");
        //    }

        //    this.m_context.Equipes.Update(new EquipeDTO(p_equipe));
        //    this.m_context.SaveChanges();
        //}
        //public void SupprimerEquipe(Entite.Equipe p_equipe)
        //{
        //    if (p_equipe is null)
        //    {
        //        throw new ArgumentNullException("le paramètre p_equipe ne peut pas etre null", nameof(p_equipe));
        //    }

        //    EquipeDTO? equipeDTO = this.m_context.Equipes.Where(eDTO => eDTO.Id == p_equipe.Id).SingleOrDefault();

        //    if (equipeDTO is null)
        //    {
        //        throw new InvalidOperationException($"l'équipe avec le id {p_equipe.Id} n'existe pas dans le dépot");
        //    }

        //    equipeDTO.Etat = false;
        //    m_context.Equipes.Update(equipeDTO);
        //    m_context.SaveChanges();
        //}
    }
}
