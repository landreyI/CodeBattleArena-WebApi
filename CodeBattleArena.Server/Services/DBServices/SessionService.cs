using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Helpers;
using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Untils;
using Microsoft.AspNetCore.Identity;
using System.Threading;

namespace CodeBattleArena.Server.Services.DBServices
{
    public class SessionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<SessionService> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<Player> _userManager;
        private readonly PlayerService _playerService;
        public SessionService(IUnitOfWork unitOfWork, ILogger<SessionService> logger, IMapper mapper, 
            UserManager<Player> userManager, PlayerService playerService)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
            _playerService = playerService;
        }

        public async Task<Result<bool, ErrorResponse>> CanAccessSessionPlayersAsync
            (int sessionId, string currentUserId, CancellationToken ct)
        {
            var checkResult = ValidationHelper.CheckUserId<bool>(currentUserId);
            if (!checkResult.IsSuccess)
                return checkResult;

            var session = await GetSessionAsync(sessionId, ct);

            bool isPrivate = session?.State == Enums.SessionState.Private;
            bool isParticipant = session?.PlayerSessions.Any(p => p.IdPlayer == currentUserId) == true;

            var role = await _playerService.GetRolesAsync(currentUserId);
            bool isEdit = Helpers.BusinessRules.isEditRole(role);

            if (isPrivate && !isParticipant && !isEdit)
                return Result.Success<bool, ErrorResponse>(false);

            return Result.Success<bool, ErrorResponse>(true);
        }
        public async Task<Result<Session, ErrorResponse>> CreateSession
            (string currentUserId, SessionDto dto, CancellationToken ct)
        {
            var checkResult = ValidationHelper.CheckUserId<Session>(currentUserId);
            if (!checkResult.IsSuccess)
                return checkResult;

            dto.CreatorId = currentUserId;
            dto.DateCreating = DateTime.Now;

            Session session = new Session();
            _mapper.Map(dto, session);

            try
            {
                var addResult = await AddSessionAsync(session, ct);
                if (!addResult.IsSuccess)
                    return Result.Failure<Session, ErrorResponse>(addResult.Failure);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in CreateSession");
                return Result.Failure<Session, ErrorResponse>(new ErrorResponse 
                { 
                    Error = "Unexpected server error." 
                });
            }

            return Result.Success<Session, ErrorResponse>(session);
        }
        public async Task<Result<Unit, ErrorResponse>> AddSessionAsync(Session session, CancellationToken ct)
        {
            try
            {
                await _unitOfWork.SessionRepository.AddSessionAsync(session, ct);
                await _unitOfWork.CommitAsync(ct);
                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding Session");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse { Error = "Database error when adding session." });
            }
        }
        public async Task AddTaskToSession(int idSession, int idTask, CancellationToken ct)
        {
            await _unitOfWork.SessionRepository.AddTaskToSession(idSession, idTask, ct);
            await _unitOfWork.CommitAsync(ct);
        }
        public async Task<Session> GetSessionAsync(int id, CancellationToken ct)
        {
            return await _unitOfWork.SessionRepository.GetSessionAsync(id, ct);
        }
        public async Task ChangePasswordSessionAsync(int idSession, string password, CancellationToken ct)
        {
            await _unitOfWork.SessionRepository.ChangePasswordSessionAsync(idSession, password, ct);
            await _unitOfWork.CommitAsync(ct);
        }
        public async Task<bool> DelSessionAsync(int id, CancellationToken ct)
        {
            try
            {
                await _unitOfWork.SessionRepository.DelSessionAsync(id, ct);
                await _unitOfWork.CommitAsync(ct);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting Session");
                return false;
            }
        }
        public async Task<List<Player>> GetListPlayerFromSessionAsync(int idSession, CancellationToken ct)
        {
            return await _unitOfWork.SessionRepository.GetListPlayerFromSessionAsync(idSession, ct);
        }
        public async Task<int> GetPlayerCountInSessionAsync(int idSession, CancellationToken ct)
        {
            return await _unitOfWork.SessionRepository.GetPlayerCountInSessionAsync(idSession, ct);
        }
        public async Task<bool> GetVictorySessionAsync(int id, CancellationToken ct)
        {
            return await _unitOfWork.SessionRepository.GetVictorySessionAsync(id, ct);
        }
        public async Task<List<Session>> GetListSessionAsync(SessionState state, CancellationToken ct)
        {
            return await _unitOfWork.SessionRepository.GetListSessionAsync(state, ct);
        }
        public async Task DeleteExpiredSessionsAsync(DateTime dateTime, CancellationToken ct)
        {
            try
            {
                await _unitOfWork.SessionRepository.DeleteExpiredSessionsAsync(dateTime, ct);
                await _unitOfWork.CommitAsync(ct);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error when executing a method (DeleteExpiredSessionsAsync)");
            }
        }
        public async Task<bool> UpdateSession(Session session, CancellationToken ct)
        {
            try
            {
                _unitOfWork.SessionRepository.UpdateSession(session);
                await _unitOfWork.CommitAsync(ct);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error when updating Session");
                return false;
            }
        }
    }
}
