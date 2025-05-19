using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.Helpers
{
    public class PlayersLeague
    {
        public LeagueDto? League { get; set; }
        public List<PlayerDto>? Players { get; set; }
        public PlayersLeague(LeagueDto? league, List<PlayerDto>? players)
        {
            League = league;
            Players = players;
        }
    }
}
