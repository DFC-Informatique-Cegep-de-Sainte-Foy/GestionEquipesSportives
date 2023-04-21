using GES_DAL.DbContexts;
using GES_Services.Entites;
using GES_Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_DAL.Depots
{
    public class DepotImportationEvenementCSVSQLServer : IDepotImportationEvenementCSV
    {
        public Equipe_sportiveContext m_context;

        private readonly string separateurChamps = "\",\"";

        private static string m_nomFichierAImporter = "";

        private string m_lien = Path.Combine(Directory.GetParent(AppContext.BaseDirectory).FullName, m_nomFichierAImporter);

        public DepotImportationEvenementCSVSQLServer(Equipe_sportiveContext context)
        {

            this.m_context = context;
        }

        public void AjouterEvenements(List<Evenement> p_evenements)
        {
            foreach (Evenement item in p_evenements)
            {
                if (m_context.Evenements.Any(e => e.IdEvenement == item.IdEvenement))
                {
                    throw new InvalidOperationException($"l'evenement avec le id {item.IdEvenement} existe deja");
                }

                m_context.Evenements.Add(new GES_DAL.BackendProject.Evenement(item));
                m_context.SaveChanges();
            }
            File.Delete(m_nomFichierAImporter);
        }
        public bool EstPresentFichier(string p_nomFichierAImporter)
        {
            m_nomFichierAImporter = p_nomFichierAImporter;
            m_lien = Path.Combine(Directory.GetParent(AppContext.BaseDirectory).FullName, m_nomFichierAImporter);
            bool present = false;
            if (string.IsNullOrWhiteSpace(m_lien))
            {
                throw new ArgumentOutOfRangeException(nameof(m_lien));
            }

            if (!File.Exists(m_lien))
            {
                throw new InvalidOperationException($"Impossible de trouver le fichier {m_lien}");
            }
            present = true;
            return present;

        }

        public IEnumerable<Evenement> LireEvenements(string p_nomFichierAImporter)
        {
            m_nomFichierAImporter = p_nomFichierAImporter;
            m_lien = Path.Combine(Directory.GetParent(AppContext.BaseDirectory).FullName, m_nomFichierAImporter);
            if (string.IsNullOrWhiteSpace(p_nomFichierAImporter))
            {
                throw new ArgumentOutOfRangeException(nameof(p_nomFichierAImporter));
            }

            if (!File.Exists(m_lien))
            {
                throw new InvalidOperationException($"Impossible de trouver le fichier {m_lien}");
            }


            List<Evenement> evenements = new List<Evenement>();

            using (StreamReader sr = File.OpenText(m_lien))
            {
                string ligneCourante;
                int numLigneCourante = 0;
                while (!sr.EndOfStream)
                {
                    ligneCourante = sr.ReadLine();
                    ++numLigneCourante;
                    if (numLigneCourante > 1)
                    {
                        try
                        {
                            ligneCourante = ligneCourante.Substring(0, ligneCourante.Length);
                            string[] valeursColonne = ligneCourante.Split(",");
                            int typeEvenement;
                            DateTime dateDebut;
                            DateTime dateFin;
                            DateTime.TryParse(valeursColonne[1] + "," + valeursColonne[2], out dateDebut);
                            DateTime.TryParse(valeursColonne[3] + "," + valeursColonne[4], out dateFin);

                            if (valeursColonne[6] == "Partie")
                            {
                                typeEvenement = 2;
                            }
                            else if (valeursColonne[6] == "Entrainement")
                            {
                                typeEvenement = 1;
                            }
                            else
                            {
                                typeEvenement = 3;
                            }
                            if (ligneCourante != ",,,,,,")
                            {

                                Evenement evenement = new Evenement(
                                            valeursColonne[0],
                                            dateDebut,
                                            dateFin,
                                            valeursColonne[5],
                                            valeursColonne[6]
                                    );

                                evenements.Add(evenement);
                            }

                        }
                        catch (Exception ex)
                        {

                            throw new InvalidDataException($"Le fichier {m_lien} n'est pas au bon format à la ligne {numLigneCourante}", ex);

                        }
                    }

                }
                sr.Close();
            }
            return evenements;
        }
    }
}
