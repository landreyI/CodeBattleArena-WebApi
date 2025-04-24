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
            (int sessionId, string userId, CancellationToken ct)
        {
            var session = await GetSessionAsync(sessionId, ct);
            if (session == null)
                return Result.Failure<bool, ErrorResponse>(new ErrorResponse { Error = "Session not found." });

            bool isPrivate = session.State == SessionState.Private;

            var checkResult = ValidationHelper.CheckUserId<bool>(userId);
            if (!checkResult.IsSuccess)
                return Result.Success<bool, ErrorResponse>(!isPrivate);

            bool isParticipant = session.PlayerSessions.Any(p => p.IdPlayer == userId);
            var role = await _playerService.GetRolesAsync(userId);
            bool isEdit = BusinessRules.IsEditRole(role);

            if (isPrivate && !isParticipant && !isEdit)
                return Result.Success<bool, ErrorResponse>(false);

            return Result.Success<bool, ErrorResponse>(true);
        }

        public async Task<Result<bool, ErrorResponse>> CanEditSessionAsync
            (int sessionId, string userId, CancellationToken ct)
        {
            var checkResult = ValidationHelper.CheckUserId<bool>(userId);
            if (!checkResult.IsSuccess)
                return Result.Success<bool, ErrorResponse>(false);

            var session = await GetSessionAsync(sessionId, ct);
            if (session == null)
                return Result.Failure<bool, ErrorResponse>(new ErrorResponse 
                { 
                    Error = "Session not found." 
                });

            var role = await _playerService.GetRolesAsync(userId);
            bool isEdit = userId == session.CreatorId || BusinessRules.IsEditRole(role);

            return Result.Success<bool, ErrorResponse>(isEdit);
        }
        public async Task<Result<Session, ErrorResponse>> CreateSession
            (string userId, SessionDto dto, CancellationToken ct)
        {
            dto.CreatorId = userId;
            dto.DateCreating = DateTime.Now;

            Session session = new Session();
            _mapper.Map(dto, session);

            var addResult = await AddSessionInDbAsync(session, ct);
            if (!addResult.IsSuccess)
                return Result.Failure<Session, ErrorResponse>(addResult.Failure);

            return Result.Success<Session, ErrorResponse>(session);
        }
        public async Task<Result<Unit, ErrorResponse>> UpdateSessionAsync
            (string userId, SessionDto dto, CancellationToken ct)
        {
            var resultIsEdit = await CanEditSessionAsync(dto.IdSession.Value, userId, ct);
            if (!resultIsEdit.IsSuccess)
                return Result.Failure<Unit, ErrorResponse>(resultIsEdit.Failure);

            bool isEdit = resultIsEdit.Success;
            if(!isEdit)
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse 
                { 
                    Error = "You do not have sufficient permissions to edit this session." 
                });

            var session = await GetSessionAsync(dto.IdSession.Value, ct); // получаем из БД
            if (session == null)
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse { Error = "Session not found." });

            _mapper.Map(dto, session);

            var resultUpdate = await UpdateSessionInDbAsync(session, ct);
            if(!resultUpdate.IsSuccess)
                return Result.Failure<Unit, ErrorResponse>(resultUpdate.Failure);

            return Result.Success<Unit, ErrorResponse>(Unit.Value);
        }

        //DATABASE
        public async Task<Result<Unit, ErrorResponse>> AddSessionInDbAsync(Session session, CancellationToken ct)
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
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse 
                { 
                    Error = "Database error when adding session." 
                });
            }
        }
        public async Task AddTaskToSessionInDbAsync(int idSession, int idTask, CancellationToken ct)
        {
            await _unitOfWork.SessionRepository.AddTaskToSession(idSession, idTask, ct);
            await _unitOfWork.CommitAsync(ct);
        }
        public async Task<Session> GetSessionAsync(int id, CancellationToken ct)
        {
            return await _unitOfWork.SessionRepository.GetSessionAsync(id, ct);
        }
        public async Task ChangePasswordSessionInDbAsync(int idSession, string password, CancellationToken ct)
        {
            await _unitOfWork.SessionRepository.ChangePasswordSessionAsync(idSession, password, ct);
            await _unitOfWork.CommitAsync(ct);
        }
        public async Task<bool> DelSessionInDbAsync(int id, CancellationToken ct)
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
        public async Task DeleteExpiredSessionsInDbAsync(DateTime dateTime, CancellationToken ct)
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
        public async Task<Result<Unit, ErrorResponse>> UpdateSessionInDbAsync(Session session, CancellationToken ct)
        {
            try
            {
                _unitOfWork.SessionRepository.UpdateSession(session);
                await _unitOfWork.CommitAsync(ct);
                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error when updating Session");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse 
                { 
                    Error = "Database error when update session." 
                });
            }
        }
    }
}
