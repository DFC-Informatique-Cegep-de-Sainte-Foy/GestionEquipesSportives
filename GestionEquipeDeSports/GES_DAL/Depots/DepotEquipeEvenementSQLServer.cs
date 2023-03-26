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
            throw new NotImplementedException();
        }

        public IEnumerable<Entite.EquipeEvenement> ListerEquipeEvenemnt()
        {
            return this.m_context.EquipeEvenements.Select(ee => ee.FromDTO());
        }

        void IDepotEquipeEvenement.ModifierEquipeEvenement(EquipeEvenement p_equipeEvenement)
        {
            throw new NotImplementedException();
        }

        void IDepotEquipeEvenement.SupprimerEquipeEvenement(EquipeEvenement p_equipeEvenement)
        {
            throw new NotImplementedException();
        }
    }
}
