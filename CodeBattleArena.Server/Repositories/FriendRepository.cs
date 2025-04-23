using CodeBattleArena.Server.Data;
using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CodeBattleArena.Server.Repositories
{
    public class FriendRepository : IFriendRepository
    {
        private readonly AppDBContext _context;

        public FriendRepository(AppDBContext context)
        {
            _context = context;
        }
        public async Task AddFriendAsync(string playerId1, string playerId2, CancellationToken cancellationToken)
        {
            if (playerId1 == playerId2)
                return;

            // Упорядочим ID чтобы избежать дубликатов
            var (id1, id2) = string.CompareOrdinal(playerId1, playerId2) < 0
                ? (playerId1, playerId2)
                : (playerId2, playerId1);

            // Проверим, существует ли уже дружба
            bool exists = await _context.Friends
                .AnyAsync(f => f.IdPlayer1 == id1 && f.IdPlayer2 == id2, cancellationToken);

            if (exists)
                return;

            var friend = new Friend
            {
                IdPlayer1 = id1,
                IdPlayer2 = id2
            };

            await _context.Friends.AddAsync(friend);
        }
        public async Task DeleteFriendAsync(string playerId1, string playerId2, CancellationToken cancellationToken)
        {
            if (playerId1 == playerId2)
                return;

            var (id1, id2) = string.CompareOrdinal(playerId1, playerId2) < 0
                ? (playerId1, playerId2)
                : (playerId2, playerId1);

            var friend = await _context.Friends
                .FirstOrDefaultAsync(f => f.IdPlayer1 == id1 && f.IdPlayer2 == id2, cancellationToken);

            if (friend != null) _context.Friends.Remove(friend);
        }
        public async Task<List<Player>> GetAllFriendsAsync(string playerId, CancellationToken cancellationToken)
        {
            return await _context.Friends
                    .Where(f => f.IdPlayer1 == playerId || f.IdPlayer2 == playerId)
                    .Select(f => f.IdPlayer1 == playerId ? f.Player2 : f.Player1)
                    .ToListAsync(cancellationToken);
        }
    }
}
