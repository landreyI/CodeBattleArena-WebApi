
using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Models;
using System.Linq.Expressions;

namespace CodeBattleArena.Server.Specifications.SessionSpec
{
    public class TaskPlaySpec : TaskPlayDefaultIncludesSpec
    {
        public TaskPlaySpec(int? id = null, TaskType? taskType = null) : base()
        {
            var criteria = new List<Expression<Func<TaskPlay, bool>>>();

            if (id.HasValue)
                criteria.Add(tp => tp.IdTask == id.Value);

            if (taskType.HasValue)
                criteria.Add(tp => tp.Type == taskType.Value);

            if (criteria.Any())
            {
                var parameter = Expression.Parameter(typeof(TaskPlay), "tp");
                var combinedBody = criteria
                    .Select(c => new ParameterRebinder(c.Parameters[0], parameter).Visit(c.Body))
                    .Aggregate(Expression.AndAlso);
                Criteria = Expression.Lambda<Func<TaskPlay, bool>>(combinedBody, parameter);
            }
            else
            {
                Criteria = tp => true;
            }
        }
    }
}
