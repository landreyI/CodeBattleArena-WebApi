using CodeBattleArena.Server.Data;
using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace CodeBattleArena.Server.Repositories
{
    public class PlayerSessionRepository : IPlayerSessionRepository
    {
        private readonly AppDBContext _context;

        public PlayerSessionRepository(AppDBContext context)
        {
            _context = context;
        }

        public async Task AddPlayerSessionAsync(PlayerSession playerSession, CancellationToken cancellationToken)
        {
            await _context.PlayersSession.AddAsync(playerSession);
        }
        public async Task<PlayerSession> GetPlayerSessionAsync(int idSession, string idPlayer, CancellationToken cancellationToken)
        {
            return await _context.PlayersSession
                .Include(p => p.Player)
                .Include(s => s.Session)
                .ThenInclude(l => l.LangProgramming)
                .FirstOrDefaultAsync(s => s.IdSession == idSession && s.IdPlayer == idPlayer,
                cancellationToken);
        }
        public async Task<List<PlayerSession>> GetPlayerSessionByIdPlayer(string idPlayer, CancellationToken cancellationToken)
        {
            return await _context.PlayersSession
                .Include(p => p.Player)
                .Include(s => s.Session)
                .ThenInclude(s => s.LangProgramming)
                .Where(ps => ps.IdPlayer == idPlayer)
                .ToListAsync(cancellationToken);
        }
        public async Task<List<PlayerSession>> GetPlayerSessionByIdSession(int idSession, CancellationToken cancellationToken)
        {
            return await _context.PlayersSession
                .Include(p => p.Player)
                .Include(s => s.Session)
                .ThenInclude(s => s.LangProgramming)
                .Where(ps => ps.IdSession == idSession)
                .ToListAsync(cancellationToken);
        }
        public void UpdatePlayerSession(PlayerSession playerSession)
        {
            _context.PlayersSession.Update(playerSession);
        }
        public async Task FinishTaskAsync(int idSession, string idPlayer, CancellationToken cancellationToken)
        {
            var playerSession = await GetPlayerSessionAsync(idSession, idPlayer, cancellationToken);
            if (playerSession != null) playerSession.IsCompleted = true;
        }
        public async Task DelPlayerSessionAsync(int idSession, string idPlayer, CancellationToken cancellationToken)
        {
            var playerSession = await GetPlayerSessionAsync(idSession, idPlayer, cancellationToken);
            if (playerSession != null) _context.PlayersSession.Remove(playerSession);

        }
    }
}
