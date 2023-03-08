using GES_DAL.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_DAL
{
    public class GestionEquipeContextSQLServer : DbContext
    {
        public GestionEquipeContextSQLServer(DbContextOptions<GestionEquipeContextSQLServer> options)
            : base(options)
        {

        }

        public DbSet<EvenementDTO> Evenements { get; set; }
        public DbSet<EquipeDTO> Equipe { get; set; }
    }
}
