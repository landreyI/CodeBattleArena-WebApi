using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.IRepositories
{
    public interface IPlayerSessionRepository
    {
        Task AddPlayerSessionAsync(PlayerSession playerSession, CancellationToken cancellationToken);
        Task<PlayerSession> GetPlayerSessionAsync(int idSession, string idPlayer, CancellationToken cancellationToken);
        Task<List<PlayerSession>> GetPlayerSessionByIdPlayer(string idPlayer, CancellationToken cancellationToken);
        Task<List<PlayerSession>> GetPlayerSessionByIdSession(int idSession, CancellationToken cancellationToken);

        void UpdatePlayerSession(PlayerSession playerSession);
        Task FinishTaskAsync(int idSession, string idPlayer, CancellationToken cancellationToken);
        Task DelPlayerSessionAsync(int idSession, string idPlayer, CancellationToken cancellationToken);
    }
}
