using Google.Apis.Gmail.v1.Data;
using System.ComponentModel.DataAnnotations;

namespace CodeBattleArena.Server.Models
{
    public class Chat
    {
        [Key]
        public int IdChat { get; set; }

        public string IdPlayer1 { get; set; }
        public Player Player1 { get; set; }
        public string IdPlayer2 { get; set; }
        public Player Player2 { get; set; }

        public ICollection<Message> Messages { get; set; }
    }

}
