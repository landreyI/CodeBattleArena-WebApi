using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Filters;
using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Untils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CodeBattleArena.Server.Services.DBServices
{
    public class TaskService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<SessionService> _logger;
        private readonly IMapper _mapper;
        public TaskService(IUnitOfWork unitOfWork, ILogger<SessionService> logger, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<Result<TaskProgramming, ErrorResponse>> CreateTaskProgrammingAsync
            (TaskProgrammingDto dto, CancellationToken ct)
        {
            TaskProgramming taskProgramming = new TaskProgramming();
            _mapper.Map(dto, taskProgramming);

            taskProgramming.TaskInputData = _mapper.Map<List<TaskInputData>>(dto.TaskInputData);

            foreach (var taskInputData in taskProgramming.TaskInputData)
            {
                if (taskInputData.InputData?.IdInputData is int existingId)
                {
                    var existingInputData = await _unitOfWork.TaskRepository.GetInputDataById(existingId);

                    if (existingInputData == null)
                        return Result.Failure<TaskProgramming, ErrorResponse>(
                            new ErrorResponse { Error = "InputData not found" });

                    taskInputData.InputData = existingInputData;
                }
            }

            var addResult = await AddTaskProgrammingInDbAsync(taskProgramming, ct);
            if (!addResult.IsSuccess)
                return Result.Failure<TaskProgramming, ErrorResponse>(addResult.Failure);

            return Result.Success<TaskProgramming, ErrorResponse>(taskProgramming);
        }

        public async Task<Result<Unit, ErrorResponse>> UpdateTaskProgrammingAsync
     (TaskProgrammingDto dto, CancellationToken ct)
        {
            var task = await GetTaskProgrammingAsync(dto.IdTaskProgramming.Value, ct);
            if (task == null)
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Task not found"
                });

            // без TaskInputData
            _mapper.Map(dto, task);

            var listTaskInputData = task.TaskInputData.ToList();
            var updatedTaskInputData = new List<TaskInputData>();
            var dtoIds = dto.TaskInputData?.Select(x => x.IdInputDataTask).ToHashSet();

            foreach (var inputDto in dto.TaskInputData ?? Enumerable.Empty<TaskInputDataDto>())
            {
                var inputDB = listTaskInputData.FirstOrDefault(x => x.IdInputDataTask == inputDto.IdInputDataTask);
                if (inputDB != null)
                {
                    // Обновляем существующую сущность
                    inputDB.Answer = inputDto.Answer;
                    inputDB.InputData.Data = inputDto.InputData?.Data ?? string.Empty;
                    updatedTaskInputData.Add(inputDB);
                }
                else
                {
                    // Добавляем новую
                    var newInputData = new InputData
                    {
                        Data = inputDto.InputData?.Data ?? string.Empty
                    };

                    var newTaskInputData = new TaskInputData
                    {
                        InputData = newInputData,
                        Answer = inputDto.Answer
                    };

                    updatedTaskInputData.Add(newTaskInputData);
                }
            }

            // Удаляем записи, которые больше не присутствуют в dto
            var itemsToRemove = listTaskInputData
                .Where(x => !dtoIds.Contains(x.IdInputDataTask))
                .ToList();

            if (itemsToRemove.Any())
            {
                _unitOfWork.TaskRepository.DeleteListTaskInputDatas(itemsToRemove);
                await _unitOfWork.CommitAsync(ct);
            }

            // Обновляем список task.TaskInputData
            task.TaskInputData = updatedTaskInputData;

            var resultUpdate = await UpdateTaskProgrammingInDbAsync(task, ct);
            if (!resultUpdate.IsSuccess)
                return Result.Failure<Unit, ErrorResponse>(resultUpdate.Failure);

            return Result.Success<Unit, ErrorResponse>(Unit.Value);
        }


        //DATABASE
        public async Task<Result<Unit, ErrorResponse>> AddTaskProgrammingInDbAsync(TaskProgramming taskProgramming, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.TaskRepository.AddTaskProgrammingAsync(taskProgramming, cancellationToken);
                await _unitOfWork.CommitAsync(cancellationToken); // Сохранение изменений
                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding TaskProgramming");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when adding taskProgramming."
                });
            }
        }
        public async Task<Result<Unit, ErrorResponse>> AddInputDataInDbAsync(string data, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.TaskRepository.AddInputDataAsync(data, cancellationToken);
                await _unitOfWork.CommitAsync(cancellationToken);
                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding InputData");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when adding InputData."
                });
            }
        }
        public async Task<Result<Unit, ErrorResponse>> AddTaskInputDataInDbAsync(TaskInputData taskInputData, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.TaskRepository.AddTaskInputDataAsync(taskInputData, cancellationToken);
                await _unitOfWork.CommitAsync(cancellationToken);
                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding TaskInputData");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when adding TaskInputData."
                });
            }
        }
        public async Task<List<InputData>> GetInputDataListAsync(CancellationToken cancellationToken)
        {
            return await _unitOfWork.TaskRepository.GetInputDataListAsync(cancellationToken);
        }
        public async Task<List<TaskInputData>> GetTaskInputDataByIdTaskProgrammingAsync(int id, CancellationToken cancellationToken)
        {
            return await _unitOfWork.TaskRepository.GetTaskInputDataByIdTaskProgrammingAsync(id, cancellationToken);
        }
        public async Task<List<TaskProgramming>> GetTaskProgrammingListAsync(IFilter<TaskProgramming>? filter, CancellationToken cancellationToken)
        {
            return await _unitOfWork.TaskRepository.GetTaskProgrammingListAsync(filter, cancellationToken);
        }
        public async Task<TaskProgramming> GetTaskProgrammingAsync(int id, CancellationToken cancellationToken)
        {
            return await _unitOfWork.TaskRepository.GetTaskProgrammingAsync(id, cancellationToken);
        }
        public async Task<Result<Unit, ErrorResponse>> UpdateTaskProgrammingInDbAsync(TaskProgramming taskProgramming, CancellationToken cancellationToken)
        {
            try
            {
                _unitOfWork.TaskRepository.UpdateTaskProgrammingAsync(taskProgramming);
                await _unitOfWork.CommitAsync(cancellationToken);
                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error when updating TaskProgramming");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when update taskProgramming."
                });
            }
        }
        public async Task<Result<Unit, ErrorResponse>> DeleteTaskInputDataInDbAsync(int idTaskProgramming, int idInputData, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.TaskRepository.DeleteTaskInputDataAsync(idTaskProgramming, idInputData, cancellationToken);
                await _unitOfWork.CommitAsync(cancellationToken);
                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting TaskInputData");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when deleting TaskInputData."
                });
            }
        }
        public async Task<Result<Unit, ErrorResponse>> DeleteTaskProgrammingInDbAsync(int id, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.TaskRepository.DeleteTaskProgrammingAsync(id, cancellationToken);
                await _unitOfWork.CommitAsync(cancellationToken);
                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting TaskProgramming");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when deleting taskProgramming."
                });
            }
        }
    }
}
