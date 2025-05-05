import { api } from "../api/axios";
import { InputData, TaskProgramming } from "@/models/dbModels";
import { TaskProgrammingFilters } from "../models/filters";

export const fetchGetTask = async (id: number): Promise<TaskProgramming> => {
    try {
        let response = await api.get(`Task/info-task-programming`, {
            params: { id: id }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetTasks = async (filter?: TaskProgrammingFilters): Promise<TaskProgramming[]> => {
    try {
        let response = await api.get(`Task/list-tasks-programming`, {
            params: filter 
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}


export const fetchGetInputDatas = async (): Promise<InputData[]> => {
    try {
        let response = await api.get(`Task/list-input-datas`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchCreateTask = async (task: TaskProgramming) => {
    try {
        const response = await api.post(`Task/create-task-programming`, task);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchDeleteTask = async (id: number): Promise<boolean> => {
    try {
        let response = await api.delete(`Task/delete-task-programming`, {
            params: { id: id }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchUpdateTask = async (task: TaskProgramming): Promise<boolean> => {
    try {
        const response = await api.put(`Task/edit-task-programming`, task);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}