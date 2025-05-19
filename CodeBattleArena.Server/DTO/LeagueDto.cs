using System.ComponentModel.DataAnnotations;

namespace CodeBattleArena.Server.DTO
{
    public class LeagueDto
    {
        public int? IdLeague { get; set; }
        public string Name { get; set; }
        public int MinWins { get; set; }
        public int? MaxWins { get; set; }
    }
}
