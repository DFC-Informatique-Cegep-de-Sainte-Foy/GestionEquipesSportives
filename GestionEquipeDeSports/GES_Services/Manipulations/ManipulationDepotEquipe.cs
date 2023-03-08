﻿using GES_Services.Interfaces;
using GES_Services.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Manipulations
{
    public class ManipulationDepotEquipe
    {
        private IDepotEquipe m_depotEquipe;
        public ManipulationDepotEquipe(IDepotEquipe p_depotEquipe)
        {
            this.m_depotEquipe = p_depotEquipe;
        }

        public IEnumerable<Equipe> ListerEquipes()
        {
            return this.m_depotEquipe.ListerEquipes();
        }
        public Equipe ChercherEquipeParId(int p_id)
        {
            if(p_id < 0)
            {
                throw new ArgumentOutOfRangeException("Le paramètre p_id ne peut pas être négatif", nameof(p_id));
            }
            return this.m_depotEquipe.ChercherEquipeParId(p_id);
        }
        public void AjouterEquipe(Equipe p_equipe)
        {
            if(p_equipe == null)
            {
                throw new ArgumentNullException("Le paramètre p_equipe ne peut pas être null", nameof(p_equipe));
            }
            this.m_depotEquipe.AjouterEquipe(p_equipe);
        }
        public void ModifierEquipe(Equipe p_equipe)
        {
            if (p_equipe == null)
            {
                throw new ArgumentNullException("Le paramètre p_equipe ne peut pas être null", nameof(p_equipe));
            }
            this.m_depotEquipe.ModifierEquipe(p_equipe);
        }
        public void SupprimerEquipe(Equipe p_equipe)
        {
            if (p_equipe == null)
            {
                throw new ArgumentNullException("Le paramètre p_equipe ne peut pas être null", nameof(p_equipe));
            }
            this.m_depotEquipe.SupprimerEquipe(p_equipe);
        }
    }
}
