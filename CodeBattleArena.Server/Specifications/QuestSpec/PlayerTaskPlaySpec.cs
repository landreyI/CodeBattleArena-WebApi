using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Models;
using System.ComponentModel;
using System.Linq.Expressions;

namespace CodeBattleArena.Server.Specifications.QuestSpec
{
    public class PlayerTaskPlaySpec : Specification<PlayerTaskPlay>
    {
        public PlayerTaskPlaySpec(int? idTaskPlay = null, string? idPlayer = null)
        {
            var criteria = new List<Expression<Func<PlayerTaskPlay, bool>>>();

            if (idTaskPlay.HasValue)
                criteria.Add(pt => pt.TaskPlayId == idTaskPlay.Value);

            if (!string.IsNullOrEmpty(idPlayer))
                criteria.Add(pt => pt.PlayerId == idPlayer);

            if (criteria.Any())
            {
                var parameter = Expression.Parameter(typeof(PlayerTaskPlay), "pt");
                var combinedBody = criteria
                    .Select(c => new ParameterRebinder(c.Parameters[0], parameter).Visit(c.Body))
                    .Aggregate(Expression.AndAlso);
                Criteria = Expression.Lambda<Func<PlayerTaskPlay, bool>>(combinedBody, parameter);
            }
            else
            {
                Criteria = pt => true;
            }
        }
    }
}
