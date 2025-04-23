using System.ComponentModel.DataAnnotations;

namespace CodeBattleArena.Server.Models
{
    public class Message
    {
        [Key]
        public int IdMessage { get; set; }

        public int IdChat { get; set; }
        public Chat Chat { get; set; }
        public string IdSender { get; set; }
        public Player Sender { get; set; }

        public string MessageText { get; set; }
        public DateTime SentDateTime { get; set; }

    }
}
