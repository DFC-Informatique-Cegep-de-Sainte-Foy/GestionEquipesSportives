using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GES_Services.Entites
{
    public class Evenement
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public EnumTypeEvenement TypeEvenement { get; set; }
        private List<Utilisateur> Participants { get; set; }
        public List<Equipe> EquipesParticipantes { get; set; }


        public Evenement()
        {
            // random id for now
            Id = new Random().Next(1, 1000);
            Participants = new List<Utilisateur>();
        }

        private void AddParticipant(Utilisateur participant)
        {
            Participants.Add(participant);
        }
    }
}
