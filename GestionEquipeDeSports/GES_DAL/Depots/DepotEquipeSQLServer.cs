using GES_DAL.DTOs;
using GES_Services.Entites;
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
        public GestionEquipeContextSQLServer m_context;

        public DepotEquipeSQLServer(GestionEquipeContextSQLServer p_context)
        {
            if (p_context is null)
            {
                throw new ArgumentNullException(nameof(p_context));
            }

            this.m_context = p_context;
        }

        public IEnumerable<Equipe> ListerEquipes()
        {
            return this.m_context.Equipes.Select(eDTO => eDTO.VersEntite()).ToList();


        }
        public Equipe ChercherEquipeParId(int id)
        {
            if (id < 0)
            {
                throw new ArgumentOutOfRangeException("le parametre \"id\" doit etre superieur à 0", nameof(id));
            }

            EquipeDTO equipeDTO = this.m_context.Equipes.FirstOrDefault(e => e.Id == id);

            if (equipeDTO is null)
            {
                throw new InvalidOperationException($"l'équipe avec le id {id} n'existe pas dans le dépot");
            }

            return equipeDTO.VersEntite();
        }
        public void AjouterEquipe(Equipe p_equipe)
        {
            if (p_equipe is null)
            {
                throw new ArgumentNullException("le paramàtre p_equipe ne peut pas être null", nameof(p_equipe));
            }

            if (this.m_context.Equipes.Any(e => e.Id == p_equipe.Id))
            {
                throw new InvalidOperationException($"l'équipe avec le id {p_equipe.Id} existe déjà dans le dépot");
            }

            this.m_context.Equipes.Add(new EquipeDTO(p_equipe));
            this.m_context.SaveChanges();
        }
        public void ModifierEquipe(Equipe p_equipe)
        {
            if (p_equipe is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(p_equipe));
            }

            if (!this.m_context.Evenements.Any(e => e.Id == p_equipe.Id))
            {
                throw new InvalidOperationException($"l'evenement avec le id {p_equipe.Id} n'existe pas");
            }

            this.m_context.Equipes.Update(new EquipeDTO(p_equipe));
            this.m_context.SaveChanges();
        }
        public void SupprimerEquipe(Equipe p_equipe)
        {
            if (p_equipe is null)
            {
                throw new ArgumentNullException("le paramètre p_equipe ne peut pas etre null", nameof(p_equipe));
            }

            EquipeDTO? equipeDTO = this.m_context.Equipes.Where(e => e.Id == p_equipe.Id).SingleOrDefault();

            if (equipeDTO is null)
            {
                throw new InvalidOperationException($"l'équipe avec le id {p_equipe.Id} n'existe pas dans le dépot");
            }

            equipeDTO.Etat = false;
            m_context.Equipes.Update(equipeDTO);
            m_context.SaveChanges();
        }
    }
}
