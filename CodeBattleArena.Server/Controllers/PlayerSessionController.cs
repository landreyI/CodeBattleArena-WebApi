using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Helpers;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Services.DBServices;
using CodeBattleArena.Server.Services.Judge0;
using CodeBattleArena.Server.Services.Notifications.INotifications;
using CodeBattleArena.Server.Untils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Emit;
using System.Runtime.CompilerServices;
using System.Threading;

namespace CodeBattleArena.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerSessionController : Controller
    {
        private readonly SessionService _sessionService;
        private readonly PlayerService _playerService;
        private readonly PlayerSessionService _playerSessionService;
        private readonly UserManager<Player> _userManager;
        private readonly TaskService _taskService;
        private readonly Judge0Client _judge0Client;
        private readonly ISessionNotificationService _sessionNotificationService;
        private readonly IMapper _mapper;
        public PlayerSessionController(SessionService sessionService, UserManager<Player> userManager,
            IMapper mapper, PlayerSessionService playerSessionService, PlayerService playerService,
            TaskService taskService, ISessionNotificationService sessionNotificationService, Judge0Client judge0Client)
        {
            _sessionService = sessionService;
            _userManager = userManager;
            _mapper = mapper;
            _playerSessionService = playerSessionService;
            _playerService = playerService;
            _taskService = taskService;
            _sessionNotificationService = sessionNotificationService;
            _judge0Client = judge0Client;
        }

        [HttpGet("info-player-session")]
        public async Task<IActionResult> GetPlayerSessionInfo(string? playerId, int? sessionId, CancellationToken cancellationToken)
        {
            var authUserId = _userManager.GetUserId(User);
            var targetPlayerId = playerId ?? authUserId;

            // Получение сессии: активной или по ID
            Session? session;
            if (!sessionId.HasValue || string.IsNullOrEmpty(playerId))
            {
                session = await _playerSessionService.GetActiveSession(targetPlayerId, cancellationToken);
            }
            else
            {
                var accessCheck = await _sessionService.CanAccessSessionPlayersAsync(sessionId.Value, authUserId, cancellationToken);
                if (!accessCheck.IsSuccess)
                    return UnprocessableEntity(accessCheck.Failure);

                if (!accessCheck.Success)
                    return UnprocessableEntity(new ErrorResponse { Error = "You do not have sufficient rights to view this player." });

                session = await _sessionService.GetSessionAsync(sessionId.Value, cancellationToken);
            }

            if (session == null)
                return NotFound(new ErrorResponse { Error = "Session not found." });

            // Ограничение: нельзя просматривать чужой код
            bool isViewingOtherPlayer = targetPlayerId != authUserId;
            bool isOpponentInSession = session.PlayerSessions.Any(p => p.IdPlayer == authUserId && !p.IsCompleted);
            if (isViewingOtherPlayer && isOpponentInSession)
            {
                return NotFound(new ErrorResponse { Error = "You can't view your opponent's code :)" });
            }

            var playerSession = await _playerSessionService.GetPlayerSessionAsync(session.IdSession, targetPlayerId, cancellationToken);
            if (playerSession == null)
                return NotFound(new ErrorResponse { Error = "Player Session not found." });

            return Ok(_mapper.Map<PlayerSessionDto>(playerSession));
        }

        [Authorize]
        [HttpPut("finish-task")]
        public async Task<IActionResult> FinistTask(CancellationToken cancellationToken)
        {
            var currentUserId = _userManager.GetUserId(User);
            var activeSession = await _playerSessionService.GetActiveSession(currentUserId, cancellationToken);
            if (activeSession == null)
                return NotFound(new ErrorResponse { Error = "Not found active session." });

            var resultFinish = await _playerSessionService.FinishTask(activeSession.IdSession, currentUserId, cancellationToken);
            if (!resultFinish.IsSuccess)
                return UnprocessableEntity(resultFinish.Failure);

            var resultCount = await _sessionService.GetCountCompletedTaskAsync(activeSession.IdSession, cancellationToken);
            if (resultCount.IsSuccess)
                await _sessionNotificationService.NotifyUpdateCompletedCount(activeSession.IdSession, resultCount.Success);

            return Ok(true);
        }

        [Authorize]
        [HttpGet("leave-session")]
        public async Task<IActionResult> LeaveSession(CancellationToken cancellationToken)
        {
            var currentUserId = _userManager.GetUserId(User);

            var activeSession = await _playerSessionService.GetActiveSession(currentUserId, cancellationToken);
            if (activeSession == null)
                return Ok(false);

            var resultDeleting = await _playerSessionService.DelPlayerSessionInDbAsync(activeSession.IdSession, currentUserId, cancellationToken);
            if (!resultDeleting.IsSuccess)
                return UnprocessableEntity(resultDeleting.Failure);

            var player = await _playerService.GetPlayerAsync(currentUserId, cancellationToken);
            var dtoPlayer = _mapper.Map<PlayerDto>(player);
            await _sessionNotificationService.NotifySessionUnjoinAsync(activeSession.IdSession, dtoPlayer);

            return Ok(true);
        }

        [Authorize]
        [HttpGet("join-session")]
        public async Task<IActionResult> JoinSession(int? idSession, string? password, CancellationToken cancellationToken)
        {
            if (idSession == null) return BadRequest(new ErrorResponse { Error = "Session ID not specified." });

            var resultCheck = await _sessionService.CheckPasswordAsync(password, idSession.Value, cancellationToken);
            if (!resultCheck.IsSuccess)
                return UnprocessableEntity(resultCheck.Failure);
            if (!resultCheck.Success)
                return UnprocessableEntity(new ErrorResponse { Error = "Wrong password." });

            var currentUserId = _userManager.GetUserId(User);
            var resultCreatePlayerSession = await _playerSessionService.CreatPlayerSession(currentUserId, idSession.Value, cancellationToken);
            if (!resultCreatePlayerSession.IsSuccess)
                return UnprocessableEntity(resultCreatePlayerSession.Failure);

            var player = await _playerService.GetPlayerAsync(currentUserId, cancellationToken);
            var dtoPlayer = _mapper.Map<PlayerDto>(player);

            await _sessionNotificationService.NotifySessionJoinAsync(idSession.Value, dtoPlayer);

            return Ok(true);
        }


        [HttpGet("update-code-player")]
        public async Task<IActionResult> UpdateCodePlayer(int? sessionId, string? code, CancellationToken cancellationToken)
        {
            await _sessionNotificationService.NotifyUpdateCodePlayerAsync(sessionId.Value, code);
            return Ok(true);
        }

        [Authorize]
        [HttpPost("check-code-player")]
        public async Task<IActionResult> CheckCodePlayer([FromBody] CodeRequest codeRequest, CancellationToken cancellationToken)
        {
            var currentUserId = _userManager.GetUserId(User);

            var activeSession = await _playerSessionService.GetActiveSession(currentUserId, cancellationToken);
            if (activeSession == null)
                return NotFound(new ErrorResponse { Error = "Not found active session." });

            var inputDataList = await _taskService.GetTaskInputDataByIdTaskProgrammingAsync(
                activeSession.TaskId!.Value,
                cancellationToken);

            var payload = CodeCheckBuilder.Build(codeRequest, activeSession.TaskProgramming, inputDataList);

            var result = await _judge0Client.CheckAsync(
                payload.source_code,
                activeSession.LangProgramming.IdCheckApi,
                payload.stdin,
                payload.expected_output);

            var resultSave = await _playerSessionService.SaveCheckCodeAsync
                (activeSession.IdSession, currentUserId, codeRequest.Code ,result, cancellationToken);

            if (!resultSave.IsSuccess)
                return UnprocessableEntity(resultSave.Failure);

            await _sessionNotificationService.NotifyUpdatePlayerSessionAsync
                (_mapper.Map<PlayerSessionDto>(resultSave.Success));

            return Ok(result);
        }

        [HttpGet("player-sessions")]
        public async Task<IActionResult> GetPlayerSessions(string id, CancellationToken cancellationToken)
        {
            var playerSessions = await _playerSessionService.GetPlayerSessionByIdPlayerAsync(id, cancellationToken);

            var playerSessionsDto = _mapper.Map<List<PlayerSessionDto>>(playerSessions);

            return Ok(playerSessionsDto.Select(S => S.Session));
        }
    }
}
