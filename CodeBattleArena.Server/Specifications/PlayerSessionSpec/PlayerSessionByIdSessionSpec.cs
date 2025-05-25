
namespace CodeBattleArena.Server.Specifications.PlayerSessionSpec
{
    public class PlayerSessionByIdSessionSpec : PlayerSessionDefaultIncludesSpec
    {
        public PlayerSessionByIdSessionSpec(int idSession) : base()
        {
            Criteria = ps => ps.IdSession == idSession;
        }
    }
}
