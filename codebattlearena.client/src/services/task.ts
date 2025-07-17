import { api } from "../api/axios";
import { InputData, TaskProgramming } from "@/models/dbModels";
import { TaskProgrammingFilters } from "../models/filters";

export const fetchGetTask = async (
    id: number,
    config?: { signal?: AbortSignal }
): Promise<TaskProgramming> => {
    const response = await api.get(`Task/info-task-programming`, {
        params: { id },
        signal: config?.signal,
    });
    return response.data;
};

export const fetchGetTasks = async (
    filter: TaskProgrammingFilters | undefined,
    config?: { signal?: AbortSignal }
): Promise<TaskProgramming[]> => {
    const response = await api.get(`Task/list-tasks-programming`, {
        params: filter,
        signal: config?.signal,
    });
    return response.data;
};

export const fetchGetInputDatas = async (
    _: void,
    config?: { signal?: AbortSignal }
): Promise<InputData[]> => {
    const response = await api.get(`Task/list-input-datas`, {
        signal: config?.signal,
    });
    return response.data;
};

export const fetchCreateTask = async (
    task: TaskProgramming,
    config?: { signal?: AbortSignal }
): Promise<any> => {
    const response = await api.post(`Task/create-task-programming`, task, {
        signal: config?.signal,
    });
    return response.data;
};

export const fetchDeleteTask = async (
    id: number,
    config?: { signal?: AbortSignal }
): Promise<boolean> => {
    const response = await api.delete(`Task/delete-task-programming`, {
        params: { id },
        signal: config?.signal,
    });
    return response.data;
};

export const fetchUpdateTask = async (
    task: TaskProgramming,
    config?: { signal?: AbortSignal }
): Promise<boolean> => {
    const response = await api.put(`Task/edit-task-programming`, task, {
        signal: config?.signal,
    });
    return response.data;
};