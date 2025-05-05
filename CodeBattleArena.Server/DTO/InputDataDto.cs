using System.ComponentModel.DataAnnotations;

namespace CodeBattleArena.Server.DTO
{
    public class InputDataDto
    {
        public int? IdInputData { get; set; }
        [Required(ErrorMessage = "Data is required.")]
        public string Data { get; set; }
    }
}
