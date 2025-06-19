using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Helpers;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.QuestSystem.Interfaces;
using CodeBattleArena.Server.Services.DBServices;
using CodeBattleArena.Server.Specifications;
using CodeBattleArena.Server.Specifications.QuestSpec;

namespace CodeBattleArena.Server.QuestSystem.Handlers
{
    public class RequiredLeagueQuestHandler : IQuestTriggerHandler
    {
        private readonly QuestService _questService;
        private readonly LeagueService _leaderService;
        public RequiredLeagueQuestHandler(QuestService questService, LeagueService leagueService)
        {
            _questService = questService;
            _leaderService = leagueService;
        }
        public bool CanHandle(GameEventType eventType) => 
            eventType == GameEventType.Victory;

        public async Task HandleAsync(GameEventContext context, CancellationToken cancellationToken, bool commit = true)
        {
            await _questService.EnsurePlayerTaskPlayExistsForType(context.PlayerId, TaskType.LeagueAdvance, cancellationToken);

            var spec = Specification<PlayerTaskPlay>.Combine(
                new PlayerTaskPlayIncludesPlayer(),
                new PlayerTaskPlayByTypeSpec(TaskType.LeagueAdvance),
                new PlayerTaskPlaySpec(idPlayer: context.PlayerId)
            );
            var playersTasks = await _questService.GetListPlayerTaskPlayAsync(spec, cancellationToken);

            foreach (var playerTask in playersTasks) 
            {
                if (cancellationToken.IsCancellationRequested)
                    return;

                if (playerTask.TaskPlay?.TaskPlayParams?.Any() != true)
                    continue;

                if (playerTask.IsCompleted)
                    continue;


                var requiredLeague = playerTask.TaskPlay.GetStringParam(TaskParamKey.RequiredLeague);
                if (string.IsNullOrEmpty(requiredLeague)) continue;

                var requiredIdLeague = playerTask.TaskPlay.GetIntParam(TaskParamKey.RequiredId);
                if (!requiredIdLeague.HasValue) continue;

                var progress = playerTask.ProgressValue;
                var progressDb = await _leaderService.GetLeagueByPlayerAsync(context.PlayerId, cancellationToken);

                if (progressDb != null && progressDb.MaxWins < playerTask?.Player?.Victories)
                {
                    var leagues = await _leaderService.GetLeaguesAsync(cancellationToken);

                    var updateLeague = leagues.FirstOrDefault(l => l.MinWins > progressDb.MaxWins);
                    if (updateLeague == null) continue;

                    progress = updateLeague.Name;
                    playerTask.ProgressValue = progress.ToString();

                    if (requiredLeague.ToLowerInvariant() == progress.ToLowerInvariant() 
                            || requiredIdLeague == updateLeague.IdLeague)
                        playerTask.IsCompleted = true;
                }
            }
            await _questService.UpdatePlayerTaskPlaysInBdAsync(playersTasks, cancellationToken, commit);
        }
    }
}
