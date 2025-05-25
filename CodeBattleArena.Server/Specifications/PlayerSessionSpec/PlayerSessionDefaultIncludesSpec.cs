using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.Specifications.PlayerSessionSpec
{
    public class PlayerSessionDefaultIncludesSpec : Specification<PlayerSession>
    {
        public PlayerSessionDefaultIncludesSpec() 
        {
            AddInclude(ps => ps.Player);
            AddInclude(ps => ps.Session.LangProgramming);
        }
    }
}
