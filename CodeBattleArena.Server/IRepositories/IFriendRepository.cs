using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.IRepositories
{
    public interface IFriendRepository
    {
        Task AddFriendAsync(string playerId1, string playerId2, CancellationToken cancellationToken);
        Task DeleteFriendAsync(string playerId1, string playerId2, CancellationToken cancellationToken);
        Task<List<Player>> GetAllFriendsAsync(string playerId, CancellationToken cancellationToken);
    }
}
