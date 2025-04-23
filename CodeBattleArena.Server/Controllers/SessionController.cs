using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Helpers;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Services.DBServices;
using CodeBattleArena.Server.Untils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CodeBattleArena.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SessionController : Controller
    {
        private readonly SessionService _sessionService;
        private readonly PlayerSessionService _playerSessionService;
        private readonly UserManager<Player> _userManager;
        private readonly IMapper _mapper;
        public SessionController(SessionService sessionService, UserManager<Player> userManager,
            IMapper mapper, PlayerSessionService playerSessionService)
        {
            _sessionService = sessionService;
            _userManager = userManager;
            _mapper = mapper;
            _playerSessionService = playerSessionService;
        }

        [HttpGet("info-session")]
        public async Task<IActionResult> GetSession(int? id, CancellationToken cancellationToken)
        {
            if (id == null) return BadRequest(new ErrorResponse { Error = "Session ID not specified." });

            var session = await _sessionService.GetSessionAsync(id.Value, cancellationToken);
            if (session == null) return NotFound(new ErrorResponse { Error = "Session not found." });

            SessionDto sessionDto = new SessionDto();
            _mapper.Map(session, sessionDto);

            return Ok(sessionDto);
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
 
            var playerSessions = await _playerSessionService.GetPlayerSessionByIdSession(id.Value, cancellationToken);

            var playerSessionsDto = _mapper.Map<List<PlayerSessionDto>>(playerSessions);

            return Ok(playerSessionsDto.Select(S => S.Player));
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

            var resultCreatePlayerSession = await _playerSessionService.CreatPlayerSession(currentUserId, session, cancellationToken);
            if(!resultCreatePlayerSession.IsSuccess)
                return UnprocessableEntity(resultCreatePlayerSession.Failure);

            return Ok(session.IdSession);
        }
    }
}
