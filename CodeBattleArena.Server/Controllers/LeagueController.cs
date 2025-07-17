using AutoMapper;
using CodeBattleArena.Server.DTO.ModelsDTO;
using CodeBattleArena.Server.Infrastructure.Attributes;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Services.DBServices;
using CodeBattleArena.Server.Untils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CodeBattleArena.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeagueController : Controller
    {
        private readonly LeagueService _leagueService;
        private readonly IMapper _mapper;
        public LeagueController(LeagueService league, IMapper mapper)
        {
            _leagueService = league;
            _mapper = mapper;
        }

        [HttpGet("league")]
        public async Task<IActionResult> GetLeague(int? id, CancellationToken cancellationToken)
        {
            if (id == null) return BadRequest(new ErrorResponse { Error = "League ID not specified." });

            var league = await _leagueService.GetLeagueAsync(id.Value, cancellationToken);
            if (league == null) return NotFound(new ErrorResponse { Error = "League not found." });

            return Ok(_mapper.Map<LeagueDto>(league));
        }

        [HttpGet("list-leagues")]
        public async Task<IActionResult> GetLeagues(CancellationToken cancellationToken)
        {
            var leagues = await _leagueService.GetLeaguesAsync(cancellationToken);
            return Ok(_mapper.Map<List<LeagueDto>>(leagues));
        }

        [HttpGet("league-by-player")]
        public async Task<IActionResult> GetLeagueByPlayer(string? idPlayer, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(idPlayer)) return BadRequest(new ErrorResponse { Error = "Player ID not specified." });
            var league = await _leagueService.GetLeagueByPlayerAsync(idPlayer, cancellationToken);
            return Ok(_mapper.Map<LeagueDto>(league));
        }

        [HttpGet("players-in-leagues")]
        public async Task<IActionResult> GetPlayersLeagues(CancellationToken cancellationToken)
        {
            var playersLeagues = await _leagueService.GetPlayersLeagues(cancellationToken);
            return Ok(playersLeagues);
        }

        [Authorize]
        [RequireEditRole]
        [HttpPost("create-league")]
        public async Task<IActionResult> CreateLeague([FromBody] LeagueDto leagueDto, CancellationToken cancellationToken)
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

            var resultCreate = await _leagueService.AddLeagueInDbAsync(_mapper.Map<League>(leagueDto), cancellationToken);
            if(!resultCreate.IsSuccess)
                return UnprocessableEntity(resultCreate.Failure);

            return Ok(true);
        }

        [Authorize]
        [RequireEditRole]
        [HttpDelete("delete-league")]
        public async Task<IActionResult> DeleteLeague(int? id, CancellationToken cancellationToken)
        {
            if (id == null) return BadRequest(new ErrorResponse { Error = "Session ID not specified." });

            var resultDeleting = await _leagueService.DeleteLeagueInDbAsync(id.Value, cancellationToken);
            if (!resultDeleting.IsSuccess)
                return UnprocessableEntity(resultDeleting.Failure);

            return Ok(true);
        }

        [Authorize]
        [RequireEditRole]
        [HttpPut("edit-league")]
        public async Task<IActionResult> EditLeague([FromBody] LeagueDto leagueDto, CancellationToken cancellationToken)
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

            var resultUpdate = await _leagueService.UpdateLeagueInDbAsync(_mapper.Map<League>(leagueDto), cancellationToken);
            if (!resultUpdate.IsSuccess)
                return UnprocessableEntity(resultUpdate.Failure);

            return Ok(true);
        }
    }
}
