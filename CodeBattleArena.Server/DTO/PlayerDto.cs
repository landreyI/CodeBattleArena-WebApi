using CodeBattleArena.Server.Models;
using System.ComponentModel.DataAnnotations;

namespace CodeBattleArena.Server.DTO
{
    public class PlayerDto
    {
        [Required(ErrorMessage = "Player ID is required.")]
        public string Id { get; set; }

        [Required(ErrorMessage = "Player Username is required.")]
        [MinLength(2, ErrorMessage = "Username must be at least 2 characters long.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Player Email is required.")]
        public string Email { get; set; }
        public string? PhotoUrl { get; set; }
        public string Role { get; set; }
        public int Victories { get; set; }
        public string? AdditionalInformation { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
