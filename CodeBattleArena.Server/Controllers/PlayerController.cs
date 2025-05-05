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
using System.Collections.Generic;
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
        public async Task<IActionResult> GetPlayer(string id, CancellationToken cancellationToken)
        {
            var authUserId = _userManager.GetUserId(User);

            var resultInfo = await _playerService.GetPlayerInfoAsync(id, authUserId);

            if(!resultInfo.IsSuccess)
                return UnprocessableEntity(resultInfo.Failure);

            return Ok(new { player = resultInfo.Success.Player, isEdit = resultInfo.Success.IsEdit });
        }

        [HttpGet("list-players")]
        public async Task<IActionResult> GetPlayers(CancellationToken cancellationToken)
        {
            var players = await _playerService.GetPlayersAsync(cancellationToken);
            var dtosPlayer = _mapper.Map<List<PlayerDto>>(players);

            return Ok(dtosPlayer);
        }

        [HttpGet("player-sessions")]
        public async Task<IActionResult> GetPlayerSessions(string id, CancellationToken cancellationToken)
        {
            var playerSessions = await _playerSessionService.GetPlayerSessionByIdPlayer(id, cancellationToken);

            var playerSessionsDto = _mapper.Map<List<PlayerSessionDto>>(playerSessions);

            return Ok(playerSessionsDto.Select(S => S.Session));
        }

        [Authorize]
        [HttpPut("edit-player")]
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

            return Ok(true);
        }
    }
}
