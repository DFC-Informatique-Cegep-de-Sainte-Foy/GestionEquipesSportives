namespace GES_API.Models
{
    public class NomFichierModel
    {
        public string nomFichier { get; set; }

        public NomFichierModel()
        {
            ;
        }

        public NomFichierModel(string p_nomFichier)
        {
            nomFichier = p_nomFichier;
        }
    }
}
