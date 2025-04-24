import { api } from "../api/axios";
import { TaskProgramming } from "@/models/dbModels";

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

export const fetchGetTasks = async (): Promise<TaskProgramming[]> => {
    try {
        let response = await api.get(`Task/list-tasks-programming`, {
            params: {  }
        });
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

export const fetchUpdateTask = async (task: TaskProgramming) => {
    try {
        const response = await api.post(`Task/edit-task-programming`, task);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}