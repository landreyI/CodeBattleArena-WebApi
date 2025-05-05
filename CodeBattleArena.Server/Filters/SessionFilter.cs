using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.Filters
{
    public class SessionFilter : IFilter<Session>
    {
        public int? LangProgrammingId { get; set; }
        public int? MaxPeople { get; set; }
        public TaskProgramming? TaskProgramming { get; set; }
        public SessionState? SessionState { get; set; }
        public IQueryable<Session> ApplyTo(IQueryable<Session> query)
        {
            if (SessionState.HasValue)
                query = query.Where(x => x.State == SessionState.Value);

            if(TaskProgramming != null)
                query = query.Where(x => x.TaskProgramming.Difficulty == TaskProgramming.Difficulty);

            if(MaxPeople.HasValue)
                query = query.Where(x => x.MaxPeople >= MaxPeople.Value);

            if(LangProgrammingId.HasValue)
                query = query.Where(x => x.LangProgrammingId == LangProgrammingId);

            return query;
        }
    }
}
