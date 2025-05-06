using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Filters;
using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.IRepositories
{
    public interface ISessionRepository
    {
        Task StartGameAsync(int idSession, CancellationToken cancellationToken);
        Task AddSessionAsync(Session session, CancellationToken cancellationToken);
        Task AddTaskToSession(int idSession, int idTask, CancellationToken cancellationToken);
        Task<Session> GetSessionAsync(int id, CancellationToken cancellationToken);
        Task ChangePasswordSessionAsync(int idSession, string password, CancellationToken cancellationToken);
        Task DelSessionAsync(int id, CancellationToken cancellationToken);
        Task DelTaskToSession(int idSession, CancellationToken cancellationToken);
        Task<List<Player>> GetListPlayerFromSessionAsync(int idSession, CancellationToken cancellationToken);
        Task<int> GetPlayerCountInSessionAsync(int idSession, CancellationToken cancellationToken);
        Task<bool> GetVictorySessionAsync(int id, CancellationToken cancellationToken);
        Task<List<Session>> GetListSessionAsync(IFilter<Session>? filter, CancellationToken cancellationToken);
        Task DeleteExpiredSessionsAsync(DateTime dateTime, CancellationToken cancellationToken);
        void UpdateSession(Session session);

    }
}
