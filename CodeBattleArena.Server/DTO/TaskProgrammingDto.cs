using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Models;
using System.ComponentModel.DataAnnotations;

namespace CodeBattleArena.Server.DTO
{
    public class TaskProgrammingDto
    {
        public int IdTaskProgramming { get; set; }
        public string Name { get; set; }

        public int LangProgrammingId { get; set; }
        public LangProgramming LangProgramming { get; set; }

        public Difficulty Difficulty { get; set; }
        public string TextTask { get; set; }
        public string Preparation { get; set; }
        public string VerificationCode { get; set; }
    }
}
