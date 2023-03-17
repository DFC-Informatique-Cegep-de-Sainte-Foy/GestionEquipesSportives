using GES_Services.Entites;
using GES_Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Manipulations
{
    public class ManipulationDepotImporationEvenementCSV
    {
        public IDepotImportationEvenementCSV _DeportImportaionEvenementCSV;
        public ManipulationDepotImporationEvenementCSV(IDepotImportationEvenementCSV depotEvenement)
        {
            _DeportImportaionEvenementCSV = depotEvenement;
        }
        public void AjouterEvenements(List<Evenement> p_evenements)
        {
            if (p_evenements is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(p_evenements));
            }
            _DeportImportaionEvenementCSV.AjouterEvenements(p_evenements);
        }
        public bool EstPresentFichier(string p_nomFichierAImporter)
        {
            if (string.IsNullOrWhiteSpace(p_nomFichier.Trim())) ;
            {
                throw new ArgumentNullException("Il doit y avoir un nom de fichier");
            }
            return _DeportImportaionEvenementCSV.EstPresentFichier(p_nomFichierAImporter);
        }
        public IEnumerable<Evenement> LireEvenements(string p_nomFichier)
        {
            if (string.IsNullOrWhiteSpace(p_nomFichier.Trim()));
            {
                throw new ArgumentNullException("Il doit y avoir un nom de fichier");
            }
            return _DeportImportaionEvenementCSV.LireEvenements(p_nomFichier);

        }
    }
}
