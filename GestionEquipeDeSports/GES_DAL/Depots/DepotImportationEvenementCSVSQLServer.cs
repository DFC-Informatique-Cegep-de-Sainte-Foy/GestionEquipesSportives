using GES_DAL.DTOs;
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
        public GestionEquipeContextSQLServer m_context;

        private readonly string separateurChamps = "\",\"";

        private static string m_nomFichierAImporter = "";

        private string m_lien = Path.Combine(Directory.GetParent(AppContext.BaseDirectory).FullName, m_nomFichierAImporter);

        public DepotImportationEvenementCSVSQLServer(GestionEquipeContextSQLServer context )
        {
            
            this.m_context = context;   
        }

        public void AjouterEvenements(List<Evenement> p_evenements)
        {
            foreach (Evenement item in p_evenements)
            {
                if (m_context.Evenements.Any(e => e.Id == item.Id))
                {
                    throw new InvalidOperationException($"l'evenement avec le id {item.Id} existe deja");
                }

                m_context.Evenements.Add(new EvenementDTO(item));
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
                            EnumTypeEvenement typeEvenement;
                            DateTime dateDebut;
                            DateTime dateFin;
                            DateTime.TryParse(valeursColonne[1] + "," + valeursColonne[2], out dateDebut);
                            DateTime.TryParse(valeursColonne[3] + "," + valeursColonne[4], out dateFin);
                            
                            if (valeursColonne[6] == "Partie")
                            {
                                typeEvenement = EnumTypeEvenement.partie;
                            }
                            else if (valeursColonne[6] == "Entrainement")
                            {
                                typeEvenement = EnumTypeEvenement.entrainement;
                            }
                            else
                            {
                                typeEvenement = EnumTypeEvenement.autre;
                            }
                            if (ligneCourante != ",,,,,,")
                            {
                                Evenement evenement = new Evenement(
                                valeursColonne[0],
                                valeursColonne[5],
                                typeEvenement,
                                dateDebut,
                                dateFin
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
