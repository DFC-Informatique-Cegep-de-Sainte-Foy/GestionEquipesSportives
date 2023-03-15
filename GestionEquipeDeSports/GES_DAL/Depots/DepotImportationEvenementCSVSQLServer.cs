using GES_Services.Entites;
using GES_Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_DAL.Depots
{
    internal class DepotImportationEvenementCSVSQLServer : IDepotImportationEvenementCSV
    {
        public GestionEquipeContextSQLServer m_context;

        private readonly string separateurChamps = "\",\"";

        private string m_nomFichierAImporter;

        public DepotImportationEvenementCSVSQLServer(GestionEquipeContextSQLServer context )
        {
            
            this.m_context = context;   
        }

        public void AjouterEvenements(List<Evenement> p_evenements)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Evenement> LireEvenements(string p_nomFichierAImporter)
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

            List<Evenement> evenements = new List<Evenement>(); 

            using (StreamReader sr = File.OpenText(m_nomFichierAImporter))
            {
                string ligneCourante;
                int numLigneCourante = 0;
                while (!sr.EndOfStream)
                {
                    ligneCourante = sr.ReadLine();
                    ++numLigneCourante;
                    try
                    {
                        ligneCourante = ligneCourante.Substring(0,ligneCourante.Length - 1);
                        string[] valeursColonne = ligneCourante.Split(separateurChamps);
                        EnumTypeEvenement typeEvenement;
                        DateTime dateDebut;
                        DateTime dateFin;
                        DateTime.TryParse(valeursColonne[1] +","+ valeursColonne[2], out dateDebut);
                        DateTime.TryParse(valeursColonne[3] +","+ valeursColonne[4], out dateFin);
                        if (valeursColonne[5] == "Partie")
                        {
                            typeEvenement = EnumTypeEvenement.partie;
                        }
                        else if(valeursColonne[5] == "Entrainement")
                        {
                            typeEvenement = EnumTypeEvenement.entrainement;
                        }
                        else
                        {
                            typeEvenement = EnumTypeEvenement.autre;
                        }
                        
                        Evenement evenement = new Evenement(
                            valeursColonne[0],
                            typeEvenement,
                            dateDebut,
                            dateFin
                            );
                    }
                    catch (Exception ex)
                    {

                        throw new InvalidDataException($"Le fichier {this.m_nomFichierAImporter} n'est pas au bon format à la ligne {numLigneCourante}", ex);

                    }
                }
                sr.Close();
            }
            return evenements;
        }
    }
}
