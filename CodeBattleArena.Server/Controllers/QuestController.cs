using AutoMapper;
using CodeBattleArena.Server.DTO.ModelsDTO;
using CodeBattleArena.Server.Helpers;
using CodeBattleArena.Server.Infrastructure.Attributes;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Services.DBServices;
using CodeBattleArena.Server.Services.DBServices.IDBServices;
using CodeBattleArena.Server.Specifications;
using CodeBattleArena.Server.Specifications.QuestSpec;
using CodeBattleArena.Server.Specifications.SessionSpec;
using CodeBattleArena.Server.Untils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CodeBattleArena.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestController : Controller
    {
        private readonly IQuestService _questService;
        private readonly IMapper _mapper;
        public QuestController(IMapper mapper, IQuestService questService)
        {
            _mapper = mapper;
            _questService = questService;
        }

        [HttpGet("info-quest")]
        public async Task<IActionResult> GetQuest(int id, CancellationToken cancellationToken)
        {
            var taskPlay = await _questService.GetTaskPlayAsync(new TaskPlaySpec(id), cancellationToken);
            return Ok(_mapper.Map<TaskPlayDto>(taskPlay));
        }

        [HttpGet("list-quests")]
        public async Task<IActionResult> GetQuests(CancellationToken cancellationToken)
        {
            var tasksPlay = await _questService.GetListTaskPlayAsync(new TaskPlayDefaultIncludesSpec(), cancellationToken);
            return Ok(_mapper.Map<List<TaskPlayDto>>(tasksPlay));
        }

        [HttpGet("list-player-progress")]
        public async Task<IActionResult> GetListPlayerProgress(string? idPlayer, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(idPlayer)) return BadRequest
                    (new ErrorResponse { Error = "idPlayer ID not specified." });

            var listPlayerTaskPlay = await _questService
                .GetListPlayerTaskPlayAsync(new PlayerTaskPlaySpec(idPlayer: idPlayer), cancellationToken);

            return Ok(_mapper.Map<List<PlayerTaskPlayDto>>(listPlayerTaskPlay));
        }

        [HttpGet("player-progress")]
        public async Task<IActionResult> GetPlayerProgress(string? idPlayer, int? idTaskPlay, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(idPlayer)) return BadRequest
                    (new ErrorResponse { Error = "idPlayer ID not specified." });
            if (!idTaskPlay.HasValue) return BadRequest
                    (new ErrorResponse { Error = "idTaskPlay ID not specified." });

            var spec = Specification<PlayerTaskPlay>.Combine(
                new PlayerTaskPlaySpec(idTaskPlay.Value, idPlayer)
            );
            var playerTaskPlay = await _questService.GetPlayerTaskPlayAsync(spec, cancellationToken);

            return Ok(_mapper.Map<PlayerTaskPlayDto>(playerTaskPlay));
        }

        [HttpGet("list-rewards")]
        public async Task<IActionResult> GetRewards(CancellationToken cancellationToken) {
            var rewards = await _questService.GetRewardsAsync(cancellationToken);
            return Ok(_mapper.Map<List<RewardDto>>(rewards));
        }

        [HttpGet("list-task-play-rewards")]
        public async Task<IActionResult> GetTaskPlayRewards(int? id, CancellationToken cancellationToken)
        {
            if (id == null) return Ok();

            var taskPlayRewards = await _questService.GetTaskPlayRewardsAsync(id.Value, cancellationToken);
            var rewards = taskPlayRewards.Select(x => x.Reward).ToList();
            return Ok(_mapper.Map<List<RewardDto>>(rewards));
        }

        [Authorize]
        [HttpPut("claim-reward")]
        public async Task<IActionResult> ClaimReward([FromBody] ClaimRewardRequest request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(request.IdPlayer)) return BadRequest
                (new ErrorResponse { Error = "idPlayer ID not specified." });
            if (!request.IdTaskPlay.HasValue) return BadRequest
                (new ErrorResponse { Error = "idTask ID not specified." });

            var resultClaim = await _questService.ClaimRewardAsync(request.IdPlayer, request.IdTaskPlay.Value, cancellationToken);
            if(!resultClaim.IsSuccess)
                return UnprocessableEntity(resultClaim.Failure);

            return Ok(true);
        }

        [Authorize]
        [RequireEditRole]
        [HttpPost("create-task-play")]
        public async Task<IActionResult> CreateTaskPlay
            ([FromBody] CreateTaskPlayRequest createTaskPlayRequest, CancellationToken cancellationToken)
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

            var taskPlay = _mapper.Map<TaskPlay>(createTaskPlayRequest.TaskPlay);
            var resultCreate = await _questService.AddTaskPlayAsync(taskPlay, createTaskPlayRequest.IdRewards, cancellationToken);
            if (!resultCreate.IsSuccess)
                return UnprocessableEntity(resultCreate.Failure);

            return Ok(taskPlay.IdTask);
        }

        [Authorize]
        [RequireEditRole]
        [HttpDelete("delete-task-play")]
        public async Task<IActionResult> DeleteTaskPlay(int? id, CancellationToken cancellationToken)
        {
            if (id == null) return BadRequest(new ErrorResponse { Error = "TaskPlay ID not specified." });

            var resultDeleting = await _questService.DeleteTaskPlayAsync(id.Value, cancellationToken);
            if (!resultDeleting.IsSuccess)
                return UnprocessableEntity(resultDeleting.Failure);

            return Ok(true);
        }

        [Authorize]
        [RequireEditRole]
        [HttpPut("edit-task-play")]
        public async Task<IActionResult> EditTaskPlay([FromBody] CreateTaskPlayRequest updateTaskPlayRequest, CancellationToken cancellationToken)
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

            var resultUpdate = await _questService.UpdateTaskPlayAsync(updateTaskPlayRequest.TaskPlay, updateTaskPlayRequest.IdRewards, cancellationToken);

            if (!resultUpdate.IsSuccess)
                return UnprocessableEntity(resultUpdate.Failure);

            return Ok(true);
        }

        [Authorize]
        [RequireEditRole]
        [HttpPost("create-reward")]
        public async Task<IActionResult> CreateReward([FromBody] RewardDto rewardDto, CancellationToken cancellationToken)
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

            var reward = _mapper.Map<Reward>(rewardDto);
            var resultCreate = await _questService.AddRewardAsync(reward, cancellationToken);
            if (!resultCreate.IsSuccess)
                return UnprocessableEntity(resultCreate.Failure);

            return Ok(reward.IdReward);
        }

        [Authorize]
        [RequireEditRole]
        [HttpDelete("delete-reward")]
        public async Task<IActionResult> DeleteReward(int? id, CancellationToken cancellationToken)
        {
            if (id == null) return BadRequest(new ErrorResponse { Error = "Reward ID not specified." });

            var resultDeleting = await _questService.DeleteRewardAsync(id.Value, cancellationToken);
            if (!resultDeleting.IsSuccess)
                return UnprocessableEntity(resultDeleting.Failure);

            return Ok(true);
        }

        [Authorize]
        [RequireEditRole]
        [HttpPut("edit-reward")]
        public async Task<IActionResult> EditReward([FromBody] RewardDto rewardDto, CancellationToken cancellationToken)
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

            var resultUpdate = await _questService.UpdateRewardAsync(_mapper.Map<Reward>(rewardDto), cancellationToken);
            if (!resultUpdate.IsSuccess)
                return UnprocessableEntity(resultUpdate.Failure);

            return Ok(true);
        }
    }
}
