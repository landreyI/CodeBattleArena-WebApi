using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Helpers;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Services.DBServices;
using CodeBattleArena.Server.Untils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Numerics;
using System.Security.Claims;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CodeBattleArena.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerController : Controller
    {
        private readonly PlayerService _playerService;
        private readonly PlayerSessionService _playerSessionService;
        private readonly UserManager<Player> _userManager;
        private readonly IMapper _mapper;
        public PlayerController(UserManager<Player> userManager, PlayerService playerService, IMapper mapper, PlayerSessionService playerSessionService)
        {
            _userManager = userManager;
            _playerService = playerService;
            _mapper = mapper;
            _playerSessionService = playerSessionService;
        }

        [HttpGet("info-player")]
        public async Task<IActionResult> PlayerPage(string id, CancellationToken cancellationToken)
        {
            var identityUser = await _userManager.FindByIdAsync(id);
            if (identityUser == null)
            {
                return NotFound(new ErrorResponse { Error = "Player not found." });
            }

            var currentUserId = _userManager.GetUserId(User);

            PlayerDto playerDto = new PlayerDto();
            _mapper.Map(identityUser, playerDto);

            bool isAuth = false;

            if (currentUserId == playerDto.Id)
            {
                isAuth = true;

                var role = await _playerService.GetRolesAsync(currentUserId);

                playerDto.Role = role;
            }

            return Ok(new { player = playerDto, isAuth = isAuth });
        }

        [HttpGet("player-sessions")]
        public async Task<IActionResult> GetPlayerSessions(string id, CancellationToken cancellationToken)
        {
            var playerSessions = await _playerSessionService.GetPlayerSessionByIdPlayer(id, cancellationToken);

            var playerSessionsDto = _mapper.Map<List<PlayerSessionDto>>(playerSessions);

            return Ok(playerSessionsDto.Select(S => S.Session));
        }

        [Authorize]
        [HttpPost("edit-player")]
        public async Task<IActionResult> EditPlayer([FromBody] PlayerDto playerDto, CancellationToken cancellationToken)
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

            var result = await _playerService.UpdatePlayerAsync(authUserId, playerDto, cancellationToken);
            if(!result.IsSuccess)
                return UnprocessableEntity(result.Failure);

            return Ok();
        }
    }
}
