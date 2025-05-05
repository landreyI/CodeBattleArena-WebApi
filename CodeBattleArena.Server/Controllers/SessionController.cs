using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Filters;
using CodeBattleArena.Server.Helpers;
using CodeBattleArena.Server.Hubs;
using CodeBattleArena.Server.Infrastructure.Attributes;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Services.DBServices;
using CodeBattleArena.Server.Services.Notifications.INotifications;
using CodeBattleArena.Server.Untils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CodeBattleArena.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SessionController : Controller
    {
        private readonly SessionService _sessionService;
        private readonly PlayerService _playerService;
        private readonly PlayerSessionService _playerSessionService;
        private readonly UserManager<Player> _userManager;
        private readonly ISessionNotificationService _sessionNotificationService;
        private readonly IMapper _mapper;
        public SessionController(SessionService sessionService, UserManager<Player> userManager,
            IMapper mapper, PlayerSessionService playerSessionService, PlayerService playerService,
            ISessionNotificationService sessionNotificationService)
        {
            _sessionService = sessionService;
            _userManager = userManager;
            _mapper = mapper;
            _playerSessionService = playerSessionService;
            _playerService = playerService;
            _sessionNotificationService = sessionNotificationService;
        }

        [Authorize]
        [HttpGet("active-session")]
        public async Task<IActionResult> GetActiveSession(CancellationToken ct)
        {
            var currentUserId = _userManager.GetUserId(User);

            var checkResult = ValidationHelper.CheckUserId<Unit>(currentUserId);
            if (!checkResult.IsSuccess)
                return UnprocessableEntity(checkResult.Failure);

            var activeSession = await _playerSessionService.GetActiveSession(currentUserId, ct);
            return Ok(_mapper.Map<SessionDto>(activeSession));
        }

        [Authorize]
        [HttpGet("leave-session")]
        public async Task<IActionResult> LeaveSession(CancellationToken cancellationToken)
        {
            var currentUserId = _userManager.GetUserId(User);

            var checkResult = ValidationHelper.CheckUserId<Unit>(currentUserId);
            if (!checkResult.IsSuccess)
                return UnprocessableEntity(checkResult.Failure);

            var activeSession = await _playerSessionService.GetActiveSession(currentUserId, cancellationToken);
            if(activeSession == null)
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

            var resultCheck = await _sessionService.CheckPassword(password, idSession.Value, cancellationToken);
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

        [HttpGet("info-session")]
        public async Task<IActionResult> GetSession(int? id, CancellationToken cancellationToken)
        {
            if (id == null) return BadRequest(new ErrorResponse { Error = "Session ID not specified." });

            var session = await _sessionService.GetSessionAsync(id.Value, cancellationToken);
            if (session == null) return NotFound(new ErrorResponse { Error = "Session not found." });

            SessionDto sessionDto = new SessionDto();
            _mapper.Map(session, sessionDto);

            var authUserId = _userManager.GetUserId(User);

            var result = await _sessionService.CanEditSessionAsync(sessionDto.IdSession.Value, authUserId, cancellationToken);
            if(!result.IsSuccess)
                return UnprocessableEntity(result.Failure);

            bool isEdit = result.Success;

            return Ok(new { session = sessionDto, isEdit = isEdit });
        }

        [HttpGet("list-sessions")]
        public async Task<IActionResult> GetSessionsList(SessionFilter? filter, CancellationToken cancellationToken)
        {
            var sessions = await _sessionService.GetListSessionAsync(filter, cancellationToken);
            var sessionDtos = _mapper.Map<List<SessionDto>>(sessions);
            return Ok(sessionDtos);
        }

        [HttpGet("session-players")]
        public async Task<IActionResult> GetSessionPLayers(int? id, CancellationToken cancellationToken)
        {
            if (id == null)
            {
                return BadRequest(new ErrorResponse { Error = "Session ID not specified." });
            }

            var currentUserId = _userManager.GetUserId(User);

            var result = await _sessionService.CanAccessSessionPlayersAsync(id.Value, currentUserId, cancellationToken); 

            if (!result.IsSuccess)
                return UnprocessableEntity(result.Failure);

            if(!result.Success)
                return NoContent();
 
            var playerSessions = await _playerSessionService.GetPlayerSessionByIdSession(id.Value, cancellationToken);

            var playerSessionsDto = _mapper.Map<List<PlayerSessionDto>>(playerSessions);

            return Ok(playerSessionsDto.Select(S => S.Player));
        }

        [HttpGet("select-task-for-session")]
        public async Task<IActionResult> SelectTaskForSession(int? sessionId, int? taskId, CancellationToken cancellationToken)
        {
            if (sessionId == null) return BadRequest(new ErrorResponse { Error = "Session ID not specified." });
            if (taskId == null) return BadRequest(new ErrorResponse { Error = "Task ID not specified." });

            var currentUserId = _userManager.GetUserId(User);

            var resultSelect = await _sessionService.SelectTaskForSession(
                currentUserId, sessionId.Value, taskId.Value, cancellationToken
                );

            if (!resultSelect.IsSuccess)
                return UnprocessableEntity(resultSelect.Failure);

            await _sessionNotificationService.NotifySessionUpdatedGroupAsync(resultSelect.Success);
            await _sessionNotificationService.NotifySessionUpdatedAllAsync(resultSelect.Success);

            return Ok(true);
        }

        [Authorize]
        [HttpDelete("delete-session")]
        public async Task<IActionResult> DeleteSession(int? id, CancellationToken cancellationToken)
        {
            if (id == null)
            {
                return BadRequest(new ErrorResponse { Error = "Session ID not specified." });
            }
            var currentUserId = _userManager.GetUserId(User);

            var resultDeleting = await _sessionService.DeletingSessionAsync(currentUserId, id.Value, cancellationToken);
            if (!resultDeleting.IsSuccess)
                return UnprocessableEntity(resultDeleting.Failure);

            await _sessionNotificationService.NotifySessionDeletedGroupAsync(id.Value);
            await _sessionNotificationService.NotifySessionDeletedAllAsync(id.Value);

            return Ok(true);
        }

        [Authorize]
        [HttpPost("create-session")]
        public async Task<IActionResult> CreateSession([FromBody] SessionDto sessionDto, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(e => e.Value.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                    );

                return UnprocessableEntity(errors);
            }

            var currentUserId = _userManager.GetUserId(User);

            var resultCreateSession = await _sessionService.CreateSession(currentUserId, sessionDto, cancellationToken);
            if (!resultCreateSession.IsSuccess)
                return UnprocessableEntity(resultCreateSession.Failure);

            Session session = resultCreateSession.Success;

            var resultCreatePlayerSession = await _playerSessionService.CreatPlayerSession(currentUserId, session.IdSession, cancellationToken);
            if(!resultCreatePlayerSession.IsSuccess)
                return UnprocessableEntity(resultCreatePlayerSession.Failure);

            await _sessionNotificationService.NotifySessionAddAsync(_mapper.Map(session, new SessionDto()));

            return Ok(session.IdSession);
        }

        [Authorize]
        [HttpPut("edit-session")]
        public async Task<IActionResult> EditSession([FromBody] SessionDto sessionDto, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(e => e.Value.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                    );

                return UnprocessableEntity(errors);
            }

            var authUserId = _userManager.GetUserId(User);

            var resultUpdate = await _sessionService.UpdateSessionAsync(authUserId, sessionDto, cancellationToken);
            if (!resultUpdate.IsSuccess)
                return UnprocessableEntity(resultUpdate.Failure);

            var session = await _sessionService.GetSessionAsync(sessionDto.IdSession.Value, cancellationToken);
            var dto = _mapper.Map<SessionDto>(session);

            await _sessionNotificationService.NotifySessionUpdatedGroupAsync(dto);
            await _sessionNotificationService.NotifySessionUpdatedAllAsync(dto);

            return Ok(true);
        }
    }
}
