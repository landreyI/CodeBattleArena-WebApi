using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Filters;
using CodeBattleArena.Server.Helpers;
using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Untils;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace CodeBattleArena.Server.Services.DBServices
{
    public class SessionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<SessionService> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<Player> _userManager;
        private readonly PlayerService _playerService;
        private readonly TaskService _taskService;
        public SessionService(IUnitOfWork unitOfWork, ILogger<SessionService> logger, IMapper mapper, 
            UserManager<Player> userManager, PlayerService playerService, TaskService taskService)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
            _playerService = playerService;
            _taskService = taskService;
        }

        public async Task<Result<Unit, ErrorResponse>> StartGameAsync(int sessionId, string userId, CancellationToken ct)
        {
            var resultIsEdit = await CanEditSessionAsync(sessionId, userId, ct);
            if (!resultIsEdit.IsSuccess)
                return Result.Failure<Unit, ErrorResponse>(resultIsEdit.Failure);

            bool isEdit = resultIsEdit.Success;
            if (!isEdit)
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "You do not have sufficient permissions to edit this session."
                });

            var resultStart = await StartGameInDbAsync(sessionId, ct);
            if(!resultStart.IsSuccess)
                return resultStart;

            return Result.Success<Unit, ErrorResponse>(Unit.Value);
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
            var roles = await _playerService.GetRolesAsync(userId);
            bool isEdit = BusinessRules.IsModerationRole(roles);

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

            var roles = await _playerService.GetRolesAsync(userId);
            bool isEdit = userId == session.CreatorId || BusinessRules.IsModerationRole(roles);

            return Result.Success<bool, ErrorResponse>(isEdit);
        }
        public async Task<Result<Session, ErrorResponse>> CreateSession
            (string userId, SessionDto dto, CancellationToken ct)
        {
            var sessions = await _unitOfWork.PlayerSessionRepository.GetPlayerSessionByIdPlayer(userId, ct);
            bool isActive = sessions.Any(s => s.IsCompleted == false);
            if (isActive)
                return Result.Failure<Session, ErrorResponse>(new ErrorResponse
                {
                    Error = "You already have an active session."
                });

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

            if(session.TaskId != null)
            {
                var task = await _unitOfWork.TaskRepository.GetTaskProgrammingAsync(session.TaskId.Value, ct);
                if (task == null)
                    return Result.Failure<Unit, ErrorResponse>(new ErrorResponse { Error = "Task not found." });

                if (session.LangProgrammingId != task.LangProgrammingId || dto.TaskId != session.TaskId)
                {
                    var resultDeleting = await DeletingTaskToSessionInDbAsync(session.IdSession, ct);
                    if (!resultDeleting.IsSuccess)
                        return Result.Failure<Unit, ErrorResponse>(resultDeleting.Failure);
                }
            }

            var resultUpdate = await UpdateSessionInDbAsync(session, ct);
            if(!resultUpdate.IsSuccess)
                return Result.Failure<Unit, ErrorResponse>(resultUpdate.Failure);

            return Result.Success<Unit, ErrorResponse>(Unit.Value);
        }
        public async Task<Result<SessionDto, ErrorResponse>> SelectTaskForSession
            (string userId, int idSession, int idTask, CancellationToken ct)
        {
            var session = await GetSessionAsync(idSession, ct);
            if (session == null)
                return Result.Failure<SessionDto, ErrorResponse>(new ErrorResponse{ Error = "Session not found." });

            var task = await _unitOfWork.TaskRepository.GetTaskProgrammingAsync(idTask, ct);
            if (task == null)
                return Result.Failure<SessionDto, ErrorResponse>(new ErrorResponse { Error = "Task not found." });

            if(session.LangProgrammingId != task.LangProgrammingId)
                return Result.Failure<SessionDto, ErrorResponse>(new ErrorResponse 
                { 
                    Error = "The programming language of the selected task does not match the session." 
                });

            var dto = _mapper.Map<SessionDto>(session);
            dto.TaskId = idTask;

            var resultUpdate = await UpdateSessionAsync(userId, dto, ct);
            if (!resultUpdate.IsSuccess)
                return Result.Failure<SessionDto, ErrorResponse>(resultUpdate.Failure);

            return Result.Success<SessionDto, ErrorResponse>(dto);
        }
        public async Task<Result<Unit, ErrorResponse>> DeletingSessionAsync
            (string userId, int idSession, CancellationToken ct)
        {
            var session = await GetSessionAsync(idSession, ct);
            if(session == null)
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse { Code = "Session not found."});

            var dto = _mapper.Map<SessionDto>(session);

            var resultIsEdit = await CanEditSessionAsync(dto.IdSession.Value, userId, ct);
            if (!resultIsEdit.IsSuccess)
                return Result.Failure<Unit, ErrorResponse>(resultIsEdit.Failure);

            bool isEdit = resultIsEdit.Success;
            if (!isEdit)
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "You do not have sufficient permissions to edit this session."
                });

            var resultDeleting = await DelSessionInDbAsync(idSession, ct);
            if (!resultDeleting.IsSuccess)
                return Result.Failure<Unit, ErrorResponse>(resultDeleting.Failure);

            return Result.Success<Unit, ErrorResponse>(Unit.Value);
        }
        public async Task<Result<bool, ErrorResponse>> CheckPassword
            (string password, int idSession, CancellationToken ct)
        {
            var session = await GetSessionAsync (idSession, ct);
            if (session == null)
                return Result.Failure<bool, ErrorResponse>(new ErrorResponse { Error = "Session not found" });

            return Result.Success<bool, ErrorResponse>(
                session.State == SessionState.Public || session.Password == password
            );
        }

        //DATABASE
        private async Task<Result<Unit, ErrorResponse>> StartGameInDbAsync(int idSession, CancellationToken ct)
        {
            try
            {
                await _unitOfWork.SessionRepository.StartGameAsync(idSession, ct);
                await _unitOfWork.CommitAsync(ct);
                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error start game Session");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when start game session."
                });
            }
        }
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
        private async Task<Result<Unit, ErrorResponse>> AddTaskToSessionInDbAsync(int idSession, int idTask, CancellationToken ct)
        {
            try
            {
                await _unitOfWork.SessionRepository.AddTaskToSession(idSession, idTask, ct);
                await _unitOfWork.CommitAsync(ct);
                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding Task to Session");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when Task to Session."
                });
            }
        }
        private async Task<Result<Unit, ErrorResponse>> DeletingTaskToSessionInDbAsync(int idSession, CancellationToken ct)
        {
            try
            {
                _unitOfWork.SessionRepository.DelTaskToSession(idSession, ct);
                await _unitOfWork.CommitAsync(ct);
                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error when deleting task to Session");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when deleting task to Session."
                });
            }
        }
        public async Task<Session> GetSessionAsync(int id, CancellationToken ct)
        {
            return await _unitOfWork.SessionRepository.GetSessionAsync(id, ct);
        }
        private async Task ChangePasswordSessionInDbAsync(int idSession, string password, CancellationToken ct)
        {
            await _unitOfWork.SessionRepository.ChangePasswordSessionAsync(idSession, password, ct);
            await _unitOfWork.CommitAsync(ct);
        }
        private async Task<Result<Unit, ErrorResponse>> DelSessionInDbAsync(int id, CancellationToken ct)
        {
            try
            {
                await _unitOfWork.SessionRepository.DelSessionAsync(id, ct);
                await _unitOfWork.CommitAsync(ct);
                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting Session");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when deleting session."
                });
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
        public async Task<List<Session>> GetListSessionAsync(IFilter<Session>? filter, CancellationToken ct)
        {
            return await _unitOfWork.SessionRepository.GetListSessionAsync(filter, ct);
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
        private async Task<Result<Unit, ErrorResponse>> UpdateSessionInDbAsync(Session session, CancellationToken ct)
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
