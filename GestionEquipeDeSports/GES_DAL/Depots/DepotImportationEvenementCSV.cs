using GES_Services.Entites;
using GES_Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_DAL.Depots
{
    internal class DepotImportationEvenementCSV : IDepotImportationEvenement
    {
        private readonly string separateurChamps = "\",\"";

        private string m_nomFichierAImporter;

        public DepotImportationEvenementCSV(string p_nomFichierAImporter)
        {
            if (string.IsNullOrWhiteSpace(p_nomFichierAImporter))
            {
                throw new ArgumentOutOfRangeException(nameof(p_nomFichierAImporter));
            }

            if (!File.Exists(p_nomFichierAImporter))
            {
                throw new InvalidOperationException($"Impossible de trouver le fichier {p_nomFichierAImporter}");
            }

            this.m_nomFichierAImporter = p_nomFichierAImporter;
        }
        public IEnumerable<Evenement> LireEvenements()
        {
            List<Evenement> evenements = new List<Evenement>(); 

            using (StreamReader sr = File.OpenText(m_nomFichierAImporter))
            {
                string ligneCourante;
                int numLigneCourante = 0;
                while (!sr.EndOfStream)
                {
                    ligneCourante = sr.ReadLine();
                    ++numLigneCourante;
                }
                sr.Close();
            }
            return evenements;
        }
    }
}
