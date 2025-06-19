using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using Microsoft.EntityFrameworkCore;
using static Azure.Core.HttpHeader;

namespace CodeBattleArena.Server.Services.DBServices
{
    public class FriendService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<SessionService> _logger;

        public FriendService(IUnitOfWork unitOfWork, ILogger<SessionService> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task<bool> AddFriendAsync
            (string playerId1, string playerId2, CancellationToken cancellationToken, bool commit = true)
        {
            if (string.IsNullOrEmpty(playerId1) || string.IsNullOrEmpty(playerId2)) return false;
            try
            {
                await _unitOfWork.FriendRepository.AddFriendAsync(playerId1, playerId2, cancellationToken);
                if (commit)
                    await _unitOfWork.CommitAsync(cancellationToken);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding Friend");
                return false;
            }
        }
        public async Task<bool> DeleteFriendAsync
            (string playerId1, string playerId2, CancellationToken cancellationToken, bool commit = true)
        {
            if (string.IsNullOrEmpty(playerId1) || string.IsNullOrEmpty(playerId2)) return false;
            try
            {
                await _unitOfWork.FriendRepository.DeleteFriendAsync(playerId1, playerId2, cancellationToken);
                if (commit)
                    await _unitOfWork.CommitAsync(cancellationToken);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting Friend");
                return false;
            }
        }
        public async Task<List<Player>> GetAllFriendsAsync(string playerId, CancellationToken cancellationToken)
        {
            return await _unitOfWork.FriendRepository.GetAllFriendsAsync(playerId, cancellationToken);
        }
    }
}
