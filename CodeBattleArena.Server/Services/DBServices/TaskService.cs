using CodeBattleArena.Server.Filters;
using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace CodeBattleArena.Server.Services.DBServices
{
    public class TaskService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<SessionService> _logger;

        public TaskService(IUnitOfWork unitOfWork, ILogger<SessionService> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task<bool> AddTaskProgrammingAsync(TaskProgramming taskProgramming, CancellationToken cancellationToken)
        {
            if (taskProgramming == null) return false;
            try
            {
                await _unitOfWork.TaskRepository.AddTaskProgrammingAsync(taskProgramming, cancellationToken);
                await _unitOfWork.CommitAsync(cancellationToken); // Сохранение изменений
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding TaskProgramming");
                return false;
            }
        }
        public async Task<bool> AddInputDataAsync(string data, CancellationToken cancellationToken)
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
        public async Task<bool> AddTaskInputDataAsync(TaskInputData taskInputData, CancellationToken cancellationToken)
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
        public async Task<bool> UpdateTaskProgrammingAsync(TaskProgramming taskProgramming, CancellationToken cancellationToken)
        {
            try
            {
                _unitOfWork.TaskRepository.UpdateTaskProgrammingAsync(taskProgramming);
                await _unitOfWork.CommitAsync(cancellationToken);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error when updating TaskProgramming");
                return false;
            }
        }
        public async Task DeleteTaskInputDataAsync(int idTaskProgramming, int idInputData, CancellationToken cancellationToken)
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
        public async Task DeleteTaskProgrammingAsync(int id, CancellationToken cancellationToken)
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
