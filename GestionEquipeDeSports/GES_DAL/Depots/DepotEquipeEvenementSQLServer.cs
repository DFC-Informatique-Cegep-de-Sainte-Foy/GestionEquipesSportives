using GES_DAL.Data;
using GES_Services.Entites;
using GES_Services.Interfaces;
using Entite = GES_Services.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_DAL.Depots
{
    public class DepotEquipeEvenementSQLServer : IDepotEquipeEvenement
    {
        public Equipe_sportiveContext m_context;
        public DepotEquipeEvenementSQLServer(Equipe_sportiveContext p_context)
        {
            if (p_context is null)
            {
                throw new ArgumentNullException(nameof(p_context));
            }
            this.m_context = p_context;
        }

        void IDepotEquipeEvenement.AjouterEquipeEvenement(EquipeEvenement p_equipeEvenement)
        {
            throw new NotImplementedException();
        }

        EquipeEvenement IDepotEquipeEvenement.ChercherEquipeEvenemntParId(Guid p_id)
        {
            if(p_id == Guid.Empty)
            {
                throw new ArgumentOutOfRangeException("le parametre \"id\" doit etre superieur a 0", nameof(p_id));
            }
            GES_DAL.Models.EquipeEvenement? equipeEvenementDTO = m_context.EquipeEvenements.FirstOrDefault(ee => ee.FkIdEquipe == p_id);
            if(equipeEvenementDTO == null)
            {
                throw new InvalidOperationException($"l'equipe avec le id {p_id} n'existe pas");
            }
            return equipeEvenementDTO.FromDTO();
        }

        void IDepotEquipeEvenement.ModifierEquipeEvenement(EquipeEvenement p_equipeEvenement)
        {
            throw new NotImplementedException();
        }

        void IDepotEquipeEvenement.SupprimerEquipeEvenement(EquipeEvenement p_equipeEvenement)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Evenement> ListerEquipeEvenements(Guid p_id)
        {
            //Trouver equipe
            GES_DAL.Models.Equipe? equipeDTO = m_context.Equipes.FirstOrDefault(e => e.IdEquipe == p_id);

            if (equipeDTO == null)
            {
                throw new InvalidOperationException($"l'equipe avec le id {p_id} n'existe pas");
            }

            //Trouver les evenements de l'equipe
            IEnumerable<Guid?> evenements = m_context.EquipeEvenements.Where(ee => ee.FkIdEquipe == p_id).Select(ee => ee.FkIdEvenement);

            //Trouver les evenements
            IEnumerable<Evenement> evenementsDTO = m_context.Evenements.Where(e => evenements.Contains(e.IdEvenement)).Select(e => e.DeDTOVersEntite());

            return evenementsDTO;

        }
    }
}
