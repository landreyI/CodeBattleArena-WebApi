using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Filters;
using CodeBattleArena.Server.Infrastructure.Attributes;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Services.DBServices;
using CodeBattleArena.Server.Services.Notifications.INotifications;
using CodeBattleArena.Server.Untils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CodeBattleArena.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : Controller
    {
        private readonly TaskService _taskService;
        private readonly LangProgrammingService _langProgrammingService;
        private readonly IMapper _mapper;
        private readonly ITaskNotificationService _taskNotificationService;
        public TaskController(TaskService taskService, IMapper mapper, ITaskNotificationService taskNotificationService, 
            LangProgrammingService langProgrammingService)
        {
            _taskService = taskService;
            _mapper = mapper;
            _taskNotificationService = taskNotificationService;
            _langProgrammingService = langProgrammingService;
        }

        [HttpGet("info-task-programming")]
        public async Task<IActionResult> GetTask(int? id, CancellationToken cancellationToken)
        {
            if (id == null) return BadRequest(new ErrorResponse { Error = "Task ID not specified." });

            var task = await _taskService.GetTaskProgrammingAsync(id.Value, cancellationToken);
            if (task == null) return NotFound(new ErrorResponse { Error = "Task not found." });

            var taskDto = _mapper.Map<TaskProgrammingDto>(task);

            return Ok(taskDto);
        }

        [HttpGet("list-tasks-programming")]
        public async Task<IActionResult> GetTasks([FromQuery] TaskProgrammingFilter? filter, CancellationToken cancellationToken)
        {
            var listTasks =  await _taskService.GetTaskProgrammingListAsync(filter, cancellationToken);
            var taskDtos = _mapper.Map<List<TaskProgrammingDto>>(listTasks);
            return Ok(taskDtos);
        }

        [HttpGet("list-input-datas")]
        public async Task<IActionResult> GetInputDatas(CancellationToken cancellationToken)
        {
            var listData = await _taskService.GetInputDataListAsync(cancellationToken);

            var dtos = _mapper.Map<List<InputDataDto>>(listData);

            return Ok(dtos);
        }

        [Authorize]
        [RequireEditRole]
        [HttpDelete("delete-task-programming")]
        public async Task<IActionResult> DeleteTask(int? id, CancellationToken cancellationToken)
        {
            if (id == null) return BadRequest(new ErrorResponse { Error = "Task ID not specified." });

            var result = await _taskService.DeleteTaskProgrammingInDbAsync(id.Value, cancellationToken);
            if (!result.IsSuccess)
                return UnprocessableEntity(result.Failure);

            await _taskNotificationService.NotifyTaskDeletedGroupAsync(id.Value);
            await _taskNotificationService.NotifyTaskDeletedAllAsync(id.Value);

            return Ok(true);
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

            var task = createResult.Success;
            var dtoTask = _mapper.Map<TaskProgrammingDto>(task);
            var lang = await _langProgrammingService.GetLangProgrammingAsync(task.LangProgrammingId, cancellationToken);
            var dtoLang = _mapper.Map<LangProgrammingDto>(lang);

            dtoTask.LangProgramming = dtoLang;

            await _taskNotificationService.NotifyTaskAddAsync(dtoTask);

            return Ok(task.IdTaskProgramming);
        }

        [Authorize]
        [RequireEditRole]
        [HttpPut("edit-task-programming")]
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

            await _taskNotificationService.NotifyTaskUpdatedGroupAsync(taskProgrammingDto);
            await _taskNotificationService.NotifyTaskUpdatedAllAsync(taskProgrammingDto);

            return Ok(true);
        }
    }
}
