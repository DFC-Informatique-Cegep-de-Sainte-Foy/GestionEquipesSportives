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
    public class DepotEvenementsSQLServer : IDepotEvenement
    {
        public GestionEquipeContextSQLServer m_context;

        public DepotEvenementsSQLServer(GestionEquipeContextSQLServer context)
        {
            if (context is null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            this.m_context = context;
        }

        public void AjouterEvenement(Evenement evenement)
        {
            //Add evenement to BD with m_context
            if (evenement is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(evenement));
            }

            if (m_context.Evenements.Any(e => e.Id == evenement.Id))
            {
                throw new InvalidOperationException($"l'evenement avec le id {evenement.Id} existe deja");
            }

            m_context.Evenements.Add(new EvenementDTO(evenement));
            m_context.SaveChanges();
        }

        public Evenement ChercherEvenementParId(int id)
        {
            //Search evenement in BD with m_context
            if (id < 0)
            {
                throw new ArgumentOutOfRangeException("le parametre \"id\" doit etre superieur a 0", nameof(id));
            }

            EvenementDTO evenementDTO = m_context.Evenements.FirstOrDefault(e => e.Id == id);

            if (evenementDTO is null)
            {
                throw new InvalidOperationException($"l'evenement avec le id {id} n'existe pas");
            }

            return evenementDTO.VersEntite();
        }

        public IEnumerable<Evenement> ListerEvenements()
        {
            throw new NotImplementedException();
        }

        public void ModifierEvenement(Evenement evenement)
        {
            if (evenement is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(evenement));
            }

            if (!this.m_context.Evenements.Any(e => e.Id == evenement.Id))
            {
                throw new InvalidOperationException($"l'evenement avec le id {evenement.Id} n'existe pas");
            }

            m_context.Evenements.Update(new EvenementDTO(evenement));
            m_context.SaveChanges();
        }

        public void SupprimerEvenement(Evenement evenement)
        {
            if (evenement is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(evenement));
            }

            EvenementDTO? evenementDTO = m_context.Evenements.Where(e => e.Id == evenement.Id).SingleOrDefault();

            if(evenementDTO is null)
            {
                throw new InvalidOperationException($"l'evenement avec le id {evenement.Id} n'existe pas");
            }

            evenementDTO.Etat = false;
            m_context.Evenements.Update(evenementDTO);
            m_context.SaveChanges();
        }       
    }
}