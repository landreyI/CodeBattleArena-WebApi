using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.Filters
{
    public class TaskProgrammingFilter : IFilter<TaskProgramming>
    {
        public string? Lang { get; set; }
        public Difficulty? Difficulty { get; set; }

        public IQueryable<TaskProgramming> ApplyTo(IQueryable<TaskProgramming> query)
        {
            if (Difficulty.HasValue)
                query = query.Where(x => x.Difficulty == Difficulty.Value);

            if (!string.IsNullOrWhiteSpace(Lang))
                query = query.Where(x => x.LangProgramming.CodeNameLang == Lang);

            return query;
        }
    }
}
