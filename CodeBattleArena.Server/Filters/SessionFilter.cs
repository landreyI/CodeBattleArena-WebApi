using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.Filters
{
    public class SessionFilter : IFilter<Session>
    {
        public string? Lang { get; set; }
        public int? MaxPeople { get; set; }
        public SessionState? SessionState { get; set; }
        public bool? IsStart { get; set; }
        public bool? IsFinish { get; set; }


        public IQueryable<Session> ApplyTo(IQueryable<Session> query)
        {
            if (SessionState.HasValue)
                query = query.Where(x => x.State == SessionState.Value);

            if(MaxPeople.HasValue)
                query = query.Where(x => x.MaxPeople <= MaxPeople.Value);

            if (!string.IsNullOrWhiteSpace(Lang))
                query = query.Where(x => x.LangProgramming.CodeNameLang == Lang);

            if (IsStart.HasValue)
                query = query.Where(x => x.IsStart == IsStart);

            if (IsFinish.HasValue)
                query = query.Where(x => x.IsFinish == IsFinish);

            return query;
        }
    }
}
