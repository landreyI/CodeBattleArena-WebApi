using CodeBattleArena.Server.Data;
using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CodeBattleArena.Server.Repositories
{
    public class PlayerRepository : IPlayerRepository
    {
        private readonly AppDBContext _context;

        public PlayerRepository(AppDBContext context)
        {
            _context = context;
        }

        public async Task<Player> GetPlayerAsync(string id, CancellationToken cancellationToken)
        {
            var player = await _context.Users
            .Include(u => u.PlayerSessions)
                .ThenInclude(ps => ps.Session)
            .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);

            return player;
        }

        public async Task<List<Player>> GetPlayersAsync(CancellationToken cancellationToken)
        {
            return await _context.Users.ToListAsync(cancellationToken);
        }
        public async Task AddVictoryPlayerAsync(string id, CancellationToken cancellationToken)
        {
            var player = await _context.Users.FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
            if (player != null) player.Victories++;
        }
        public async Task<List<Session>> MyGamesListAsync(string id, CancellationToken cancellationToken)
        {
            return await _context.PlayersSession
                    .Where(u => u.IdPlayer == id)
                    .Select(ps => ps.Session)
                    .ToListAsync(cancellationToken);
        }
    }
}
