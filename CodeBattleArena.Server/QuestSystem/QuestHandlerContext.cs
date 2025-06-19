using CodeBattleArena.Server.QuestSystem.Handlers;
using CodeBattleArena.Server.QuestSystem.Interfaces;
using CodeBattleArena.Server.Services.DBServices;

namespace CodeBattleArena.Server.QuestSystem
{
    public class QuestHandlerContext
    {
        private readonly QuestService _questService;
        private readonly LeagueService _leagueService;

        private readonly Lazy<WinCountQuestHandler> _winCount;
        private readonly Lazy<RequiredLeagueQuestHandler> _requiredLeague;
        private readonly Lazy<MatchPlayedQuestHandler> _matchPlayed;

        public QuestHandlerContext(QuestService questService, LeagueService leagueService)
        {
            _questService = questService;
            _leagueService = leagueService;

            _winCount = new Lazy<WinCountQuestHandler>(() => new WinCountQuestHandler(_questService));
            _requiredLeague = new Lazy<RequiredLeagueQuestHandler>(() => new RequiredLeagueQuestHandler(_questService, _leagueService));
            _matchPlayed = new Lazy<MatchPlayedQuestHandler>(() => new MatchPlayedQuestHandler(_questService));
        }

        public IEnumerable<IQuestTriggerHandler> Handlers => new IQuestTriggerHandler[]
        {
            _winCount.Value,
            _requiredLeague.Value,
            _matchPlayed.Value,
        };
    }
}
