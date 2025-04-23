using Microsoft.AspNetCore.Identity;

namespace CodeBattleArena.Server.Models
{
    public class Player : IdentityUser
    {
        public string? PhotoUrl { get; set; }
        public string? AdditionalInformation { get; set; }
        public int Victories { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<PlayerSession>? PlayerSessions { get; set; }
        public ICollection<Friend>? Friends1 { get; set; }
        public ICollection<Friend>? Friends2 { get; set; }
        public ICollection<Chat>? ChatsAsUser1 { get; set; }
        public ICollection<Chat>? ChatsAsUser2 { get; set; }
        public ICollection<Message>? Messages { get; set; }
    }
}
