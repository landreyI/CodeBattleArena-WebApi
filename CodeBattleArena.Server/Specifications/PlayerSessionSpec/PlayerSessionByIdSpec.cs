using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.Specifications.PlayerSessionSpec
{
    public class PlayerSessionByIdSpec : Specification<PlayerSession>
    {
        public PlayerSessionByIdSpec(int idSession, string idPlayer)
        {
            Criteria = ps => ps.IdSession == idSession && ps.IdPlayer == idPlayer;
        }
    }
}
