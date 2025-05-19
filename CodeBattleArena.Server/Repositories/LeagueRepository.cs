using CodeBattleArena.Server.Data;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace CodeBattleArena.Server.Repositories
{
    public class LeagueRepository : ILeagueRepository
    {
        private readonly AppDBContext _context;

        public LeagueRepository(AppDBContext context)
        {
            _context = context;
        }
        public async Task<League> GetLeagueAsync(int id, CancellationToken cancellationToken)
        {
            return await _context.Leagues.FirstOrDefaultAsync(l => l.IdLeague == id, cancellationToken);
        }
        public async Task<List<League>> GetLeaguesAsync(CancellationToken cancellationToken)
        {
            return await _context.Leagues.ToListAsync(cancellationToken);
        }
        public async Task AddLeagueAsync(League league, CancellationToken cancellationToken)
        {
            await _context.Leagues.AddAsync(league, cancellationToken);
        }
        public async Task DeleteLeagueAsync(int id, CancellationToken cancellationToken)
        {
            var league = await _context.Leagues.FindAsync(id, cancellationToken);
            if(league != null) _context.Leagues.Remove(league);
        }
        public void UpdateLeague(League league)
        {
            _context.Leagues.Update(league);
        }
    }
}
