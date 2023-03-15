using GES_Services.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Interfaces
{
    public interface IDepotImportationEvenement
    {
        IEnumerable<Evenement> LireEvenements();
    }
}
