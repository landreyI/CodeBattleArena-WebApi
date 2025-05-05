using CodeBattleArena.Server.Data;

namespace CodeBattleArena.Server.IRepositories
{
    public interface IUnitOfWork
    {
        ISessionRepository SessionRepository { get; }
        IPlayerRepository PlayerRepository { get; }
        IPlayerSessionRepository PlayerSessionRepository { get; }
        ITaskRepository TaskRepository { get; }
        IFriendRepository FriendRepository { get; }
        IChatRepository ChatRepository { get; }
        ILangProgrammingRepository LangProgrammingRepository { get; }
        Task<int> CommitAsync(CancellationToken cancellationToken);
    }
}
