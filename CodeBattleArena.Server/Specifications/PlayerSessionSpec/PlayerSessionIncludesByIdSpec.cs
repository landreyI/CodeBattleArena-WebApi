using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.Specifications.PlayerSessionSpec
{
    public class PlayerSessionIncludesByIdSpec : PlayerSessionDefaultIncludesSpec
    {
        public PlayerSessionIncludesByIdSpec(int idSession, string idPlayer) : base()
        {
            Criteria = ps => ps.IdSession == idSession && ps.IdPlayer == idPlayer;
        }
    }
}
