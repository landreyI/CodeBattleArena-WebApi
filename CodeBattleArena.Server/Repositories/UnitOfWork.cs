using CodeBattleArena.Server.Data;
using CodeBattleArena.Server.IRepositories;

namespace CodeBattleArena.Server.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDBContext _context;
        private ISessionRepository _sessionRepository;
        private IPlayerRepository _playerRepository;
        private IPlayerSessionRepository _playerSessionRepository;
        private ITaskRepository _taskRepository;
        private IFriendRepository _friendRepository;
        private IChatRepository _chatRepository;
        private ILangProgrammingRepository _langProgrammingRepository;

        public UnitOfWork(AppDBContext context)
        {
            _context = context;
        }

        public ISessionRepository SessionRepository => _sessionRepository ??= new SessionRepository(_context);
        public IPlayerRepository PlayerRepository => _playerRepository ??= new PlayerRepository(_context);
        public IPlayerSessionRepository PlayerSessionRepository => _playerSessionRepository ??= new PlayerSessionRepository(_context);
        public ITaskRepository TaskRepository => _taskRepository ??= new TaskRepository(_context);
        public IFriendRepository FriendRepository => _friendRepository ??= new FriendRepository(_context);
        public IChatRepository ChatRepository => _chatRepository ??= new ChatRepository(_context);
        public ILangProgrammingRepository LangProgrammingRepository => _langProgrammingRepository ??= new LangProgrammingRepository(_context);

        public async Task<int> CommitAsync(CancellationToken cancellationToken)
        {
            return await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
