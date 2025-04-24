using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Filters;
using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Untils;
using Microsoft.EntityFrameworkCore;
using System;

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

            var addResult = await AddTaskProgrammingInDbAsync(taskProgramming, ct);
            if (!addResult.IsSuccess)
                return Result.Failure<TaskProgramming, ErrorResponse>(addResult.Failure);

            return Result.Success<TaskProgramming, ErrorResponse>(taskProgramming);
        }

        public async Task<Result<Unit, ErrorResponse>> UpdateTaskProgrammingAsync
            (TaskProgrammingDto dto, CancellationToken ct)
        {
            var task = await GetTaskProgrammingAsync(dto.IdTaskProgramming, ct);
            if (task == null)
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse 
                { 
                    Error = "Task not found"
                });

            _mapper.Map(dto, task);

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
        public async Task<bool> AddInputDataInDbAsync(string data, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.TaskRepository.AddInputDataAsync(data, cancellationToken);
                await _unitOfWork.CommitAsync(cancellationToken);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding InputData");
                return false;
            }
        }
        public async Task<bool> AddTaskInputDataInDbAsync(TaskInputData taskInputData, CancellationToken cancellationToken)
        {
            if (taskInputData == null) return false;
            try
            {
                await _unitOfWork.TaskRepository.AddTaskInputDataAsync(taskInputData, cancellationToken);
                await _unitOfWork.CommitAsync(cancellationToken);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding TaskInputData");
                return false;
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
        public async Task DeleteTaskInputDataInDbAsync(int idTaskProgramming, int idInputData, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.TaskRepository.DeleteTaskInputDataAsync(idTaskProgramming, idInputData, cancellationToken);
                await _unitOfWork.CommitAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting TaskInputData");
            }
        }
        public async Task DeleteTaskProgrammingInDbAsync(int id, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.TaskRepository.DeleteTaskProgrammingAsync(id, cancellationToken);
                await _unitOfWork.CommitAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting TaskProgramming");
            }
        }
    }
}
