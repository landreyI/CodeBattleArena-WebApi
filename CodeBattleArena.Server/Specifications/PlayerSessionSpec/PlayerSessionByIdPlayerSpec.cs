
namespace CodeBattleArena.Server.Specifications.PlayerSessionSpec
{
    public class PlayerSessionByIdPlayerSpec : PlayerSessionDefaultIncludesSpec
    {
        public PlayerSessionByIdPlayerSpec(string idPlayer) : base()
        {
            Criteria = ps => ps.IdPlayer == idPlayer;
        }
    }
}
