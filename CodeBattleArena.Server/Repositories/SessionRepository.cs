using CodeBattleArena.Server.Data;
using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace CodeBattleArena.Server.Repositories
{
    public class SessionRepository : ISessionRepository
    {
        private readonly AppDBContext _context;

        public SessionRepository(AppDBContext context)
        {
            _context = context;
        }

        public async Task AddSessionAsync(Session session, CancellationToken cancellationToken)
        {
            await _context.Sessions.AddAsync(session);
        }
        public async Task AddTaskToSession(int idSession, int idTask, CancellationToken cancellationToken)
        {
            var session = await _context.Sessions
                .FirstOrDefaultAsync(s => s.IdSession == idSession, cancellationToken);

            var taskProgramming = await _context.TasksProgramming
                .FirstOrDefaultAsync(t => t.IdTaskProgramming == idTask, cancellationToken);

            if (taskProgramming != null && session != null) session.TaskId = idTask;
        }
        public async Task<Session> GetSessionAsync(int id, CancellationToken cancellationToken)
        {
            return await _context.Sessions
                .Include(s => s.PlayerSessions)
                .ThenInclude(p => p.Player)
                .Include(s => s.TaskProgramming)
                .Include(s => s.LangProgramming)
                .FirstOrDefaultAsync(s => s.IdSession == id, cancellationToken);
        }
        public async Task ChangePasswordSessionAsync(int idSession, string password, CancellationToken cancellationToken)
        {
            var session = await _context.Sessions
                .FirstOrDefaultAsync(s => s.IdSession == idSession, cancellationToken);
            if (session != null && !string.IsNullOrEmpty(password)) session.Password = password;
        }

        public async Task DelSessionAsync(int id, CancellationToken cancellationToken)
        {
            var session = await _context.Sessions.FindAsync(id, cancellationToken);
            if (session != null) _context.Sessions.Remove(session);
        }
        public async Task<List<Player>> GetListPlayerFromSessionAsync(int idSession, CancellationToken cancellationToken)
        {
            return await _context.PlayersSession
                .Where(s => s.IdSession == idSession)
                .Select(ps => ps.Player)
                .ToListAsync(cancellationToken);
        }
        public async Task<int> GetPlayerCountInSessionAsync(int idSession, CancellationToken cancellationToken)
        {
            return await _context.PlayersSession.CountAsync(p => p.IdSession == idSession, cancellationToken);
        }
        public async Task<bool> GetVictorySessionAsync(int id, CancellationToken cancellationToken)
        {
            var session = await _context.Sessions
                .FirstOrDefaultAsync(s => s.IdSession == id, cancellationToken);

            return session != null && !string.IsNullOrEmpty(session.WinnerId);
        }
        public async Task<List<Session>> GetListSessionAsync(SessionState state, CancellationToken cancellationToken)
        {
            return await _context.Sessions.Where(s => s.State == state).ToListAsync(cancellationToken);
        }
        public async Task DeleteExpiredSessionsAsync(DateTime dateTime, CancellationToken cancellationToken)
        {
            // Выборка сессий, которые существуют более одного дня
            var listSessionsExpired = await _context.Sessions
                .Where(s => s.WinnerId == null && dateTime > s.DateCreating.AddDays(1))
                .Select(s => s.IdSession)
                .ToListAsync(cancellationToken);

            if (listSessionsExpired.Any())
            {
                var playerSessions = _context.PlayersSession
                    .Where(ps => listSessionsExpired.Contains(ps.IdSession));

                _context.PlayersSession.RemoveRange(playerSessions);

                var sessionsToDelete = _context.Sessions
                    .Where(s => listSessionsExpired.Contains(s.IdSession));

                _context.Sessions.RemoveRange(sessionsToDelete);
            }
        }
        public void UpdateSession(Session session)
        {
            _context.Sessions.Update(session);
        }
    }
}
