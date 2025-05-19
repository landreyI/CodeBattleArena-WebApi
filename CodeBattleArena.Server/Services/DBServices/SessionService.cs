using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Filters;
using CodeBattleArena.Server.Helpers;
using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Services.Notifications.INotifications;
using CodeBattleArena.Server.Untils;
using Microsoft.AspNetCore.Identity;
using System.Globalization;

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
        private readonly ISessionNotificationService _sessionNotificationService;
        public SessionService(IUnitOfWork unitOfWork, ILogger<SessionService> logger, IMapper mapper, 
            UserManager<Player> userManager, PlayerService playerService, TaskService taskService,
            ISessionNotificationService sessionNotificationService)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
            _playerService = playerService;
            _taskService = taskService;
            _sessionNotificationService = sessionNotificationService;
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

            var session = await GetSessionAsync(sessionId, ct);
            if (session.IsStart || session.IsFinish)
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "At this stage the session cannot be launched for the game."
                });

            var resultStart = await StartGameInDbAsync(sessionId, ct);
            if(!resultStart.IsSuccess)
                return resultStart;

            return Result.Success<Unit, ErrorResponse>(Unit.Value);
        }
        public async Task<Result<Unit, ErrorResponse>> FinishGameAsync
            (int sessionId, string userId, CancellationToken ct, bool? isBackground = false)
        {
            var resultIsEdit = await CanEditSessionAsync(sessionId, userId, ct);
            if (!resultIsEdit.IsSuccess && !isBackground.HasValue)
                return Result.Failure<Unit, ErrorResponse>(resultIsEdit.Failure);

            bool isEdit = resultIsEdit.Success;
            if (!isEdit && !isBackground.HasValue)
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "You do not have sufficient permissions to edit this session."
                });

            var resultStart = await FinishGameInDbAsync(sessionId, ct);
            if (!resultStart.IsSuccess)
                return resultStart;

            var session = await GetSessionAsync(sessionId, ct);
            if (session == null)
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse { Error = "Session not found." });

            var result = await AssignBestResult(session, ct);

            return Result.Success<Unit, ErrorResponse>(Unit.Value);
        }
        private async Task<Result<Unit, ErrorResponse>> AssignBestResult(Session session, CancellationToken ct)
        {
            var best = session.PlayerSessions
                .Select(p => new {
                    Player = p,
                    ParsedTime = double.TryParse(p.Time, NumberStyles.Any, CultureInfo.InvariantCulture, out var t) ? t : double.MaxValue
                })
                .Where(p => p.Player.Memory.HasValue)
                .OrderBy(p => p.ParsedTime)
                .ThenBy(p => p.Player.Memory.Value)
                .Select(p => p.Player)
                .FirstOrDefault();

            if (best == null)
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse { Error = "No valid results." });

            session.WinnerId = best.IdPlayer;
            var resultUpdate = await UpdateSessionInDbAsync(session, ct);
            if (!resultUpdate.IsSuccess)
                return Result.Failure<Unit, ErrorResponse>(resultUpdate.Failure);

            if(session.PlayerSessions.Count > 1)
            {
                var resultAdd = await _playerService.AddVictoryPlayerInDbAsync(best.IdPlayer, ct);
                if (!resultAdd.IsSuccess)
                    return Result.Failure<Unit, ErrorResponse>(resultAdd.Failure);
            }

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
        public async Task<Result<Session, ErrorResponse>> CreateSessionAsync
            (string userId, SessionDto dto, CancellationToken ct)
        {
            var sessions = await _unitOfWork.PlayerSessionRepository.GetPlayerSessionByIdPlayerAsync(userId, ct);
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

            if (BusinessRules.IsStartetSession(session))
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "The game has started, session data cannot be changed."
                });

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
        public async Task<Result<SessionDto, ErrorResponse>> SelectTaskForSessionAsync
            (string userId, int idSession, int idTask, CancellationToken ct)
        {
            var session = await GetSessionAsync(idSession, ct);
            if (session == null)
                return Result.Failure<SessionDto, ErrorResponse>(new ErrorResponse{ Error = "Session not found." });

            var task = await _unitOfWork.TaskRepository.GetTaskProgrammingAsync(idTask, ct);
            if (task == null)
                return Result.Failure<SessionDto, ErrorResponse>(new ErrorResponse { Error = "Task not found." });

            if(BusinessRules.IsStartetSession(session))
                return Result.Failure<SessionDto, ErrorResponse>(new ErrorResponse
                {
                    Error = "The game has been started, the task cannot be changed."
                });

            if (session.LangProgrammingId != task.LangProgrammingId)
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
        public async Task<Result<bool, ErrorResponse>> CheckPasswordAsync
            (string password, int idSession, CancellationToken ct)
        {
            var session = await GetSessionAsync (idSession, ct);
            if (session == null)
                return Result.Failure<bool, ErrorResponse>(new ErrorResponse { Error = "Session not found" });

            return Result.Success<bool, ErrorResponse>(
                session.State == SessionState.Public || session.Password == password
            );
        }

        public async Task<Result<int, ErrorResponse>> GetCountCompletedTaskAsync(int idSession, CancellationToken ct)
        {
            var playerSessionList = await _unitOfWork.PlayerSessionRepository.GetPlayerSessionByIdSessionAsync(idSession, ct);

            if (playerSessionList == null)
                return Result.Failure<int, ErrorResponse>(new ErrorResponse { Error = "Session not found" });

            var completedCount = playerSessionList.Count(p => p.IsCompleted);

            return Result.Success<int, ErrorResponse>(completedCount);
        }


        //------------ DATABASE ------------
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
        private async Task<Result<Unit, ErrorResponse>> FinishGameInDbAsync(int idSession, CancellationToken ct)
        {
            try
            {
                await _unitOfWork.SessionRepository.FinishGameAsync(idSession, ct);
                await _unitOfWork.CommitAsync(ct);
                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error finish game Session");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when finish game session."
                });
            }
        }
        public async Task<PlayerSession> GetVinnerAsync(int idSession, CancellationToken ct)
        {
            return await _unitOfWork.SessionRepository.GetVinnerAsync(idSession, ct);
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
        public async Task<List<Session>> GetListSessionAsync(IFilter<Session>? filter, CancellationToken ct)
        {
            return await _unitOfWork.SessionRepository.GetListSessionAsync(filter, ct);
        }
        public async Task DeleteExpiredSessionsInDbAsync(DateTime dateTime, CancellationToken ct)
        {
            try
            {
                var idSessionsDelete = await _unitOfWork.SessionRepository.DeleteExpiredSessionsAsync(dateTime, ct);
                await _unitOfWork.CommitAsync(ct);
                foreach(var id in idSessionsDelete)
                {
                    await _sessionNotificationService.NotifySessionDeletedAllAsync(id);
                    await _sessionNotificationService.NotifySessionDeletedGroupAsync(id);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error when executing a method (DeleteExpiredSessionsAsync)");
            }
        }
        public async Task FinishExpiredSessionsInDbAsync(DateTime dateTime, CancellationToken ct)
        {
            {
                try
                {
                    var idSessionsFinishid = await _unitOfWork.SessionRepository.FinishExpiredSessionsAsync(dateTime, ct);
                    await _unitOfWork.CommitAsync(ct);
                    foreach (var id in idSessionsFinishid)
                    {
                        await _sessionNotificationService.NotifyFinishGameAsync(id);
                        await FinishGameAsync(id, null, ct, isBackground: true);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error when executing a method (FinishExpiredSessionsAsync)");
                }
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
