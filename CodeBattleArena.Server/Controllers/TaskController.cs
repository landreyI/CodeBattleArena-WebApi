using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Filters;
using CodeBattleArena.Server.Infrastructure.Attributes;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Services.DBServices;
using CodeBattleArena.Server.Untils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CodeBattleArena.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : Controller
    {
        private readonly TaskService _taskService;

        public TaskController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet("info-task-programming")]
        public async Task<IActionResult> GetTask(int? id, CancellationToken cancellationToken)
        {
            if (id == null) return BadRequest(new ErrorResponse { Error = "Task ID not specified." });

            var task = await _taskService.GetTaskProgrammingAsync(id.Value, cancellationToken);
            if (task == null) return NotFound(new ErrorResponse { Error = "Task not found." });

            return Ok(task);
        }

        [HttpGet("list-tasks-programming")]
        public async Task<IActionResult> GetTasks(TaskProgrammingFilter? taskProgramming, CancellationToken cancellationToken)
        {
            var listTasks =  await _taskService.GetTaskProgrammingListAsync(taskProgramming, cancellationToken);
            return Ok(listTasks);
        }

        [Authorize]
        [RequireEditRole]
        [HttpPost("create-task-programming")]
        public async Task<IActionResult> CreateTask([FromBody] TaskProgrammingDto taskProgrammingDto, CancellationToken cancellationToken)
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

            var createResult = await _taskService.CreateTaskProgrammingAsync(taskProgrammingDto, cancellationToken);
            if (!createResult.IsSuccess)
                return UnprocessableEntity(createResult.Failure);

            TaskProgramming task = createResult.Success;

            return Ok(task.IdTaskProgramming);
        }

        [Authorize]
        [RequireEditRole]
        [HttpPost("edit-task-programming")]
        public async Task<IActionResult> EditTask([FromBody] TaskProgrammingDto taskProgrammingDto, CancellationToken cancellationToken)
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

            var resultUpdate = await _taskService.UpdateTaskProgrammingAsync(taskProgrammingDto, cancellationToken);
            if (!resultUpdate.IsSuccess)
                return UnprocessableEntity(resultUpdate.Failure);

            return Ok();
        }
    }
}
