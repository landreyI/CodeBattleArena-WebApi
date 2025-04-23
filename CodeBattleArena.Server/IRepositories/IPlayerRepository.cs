using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.IRepositories
{
    public interface IPlayerRepository
    {
        Task<Player> GetPlayerAsync(string id, CancellationToken cancellationToken);
        Task AddVictoryPlayerAsync(string id, CancellationToken cancellationToken);
        Task<List<Session>> MyGamesListAsync(string id, CancellationToken cancellationToken);
    }
}
