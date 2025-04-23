using CodeBattleArena.Server.Filters;
using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.IRepositories
{
    public interface ITaskRepository
    {
        Task AddTaskProgrammingAsync(TaskProgramming taskProgramming, CancellationToken cancellationToken);
        Task AddInputDataAsync(string data, CancellationToken cancellationToken);
        Task AddTaskInputDataAsync(TaskInputData taskInputData, CancellationToken cancellationToken);
        Task<List<InputData>> GetInputDataListAsync(CancellationToken cancellationToken);
        Task<List<TaskInputData>> GetTaskInputDataByIdTaskProgrammingAsync(int id, CancellationToken cancellationToken);
        Task<List<TaskProgramming>> GetTaskProgrammingListAsync(IFilter<TaskProgramming>? filter, CancellationToken cancellationToken);
        Task<TaskProgramming> GetTaskProgrammingAsync(int id, CancellationToken cancellationToken);
        void UpdateTaskProgrammingAsync(TaskProgramming taskProgramming);
        Task DeleteTaskInputDataAsync(int idTaskProgramming, int idInputData, CancellationToken cancellationToken);
        Task DeleteTaskProgrammingAsync(int id, CancellationToken cancellationToken);
    }
}
