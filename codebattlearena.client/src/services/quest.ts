import { api } from "../api/axios";
import { PlayerTaskPlay, Reward, TaskPlay } from "@/models/dbModels";

export const fetchGetQuest = async (id?: number): Promise<TaskPlay> => {
    try {
        let response = await api.get(`Quest/info-quest`, {
            params: {id: id}
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetQuests = async (): Promise<TaskPlay[]> => {
    try {
        let response = await api.get(`Quest/list-quests`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetListPlayerProgress = async (idPlayer?: string): Promise<PlayerTaskPlay[]> => {
    try {
        let response = await api.get(`Quest/list-player-progress`, { params: { idPlayer: idPlayer } });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetPlayerProgress = async (idPlayer?: string, idTaskPlay?: number): Promise<PlayerTaskPlay> => {
    try {
        let response = await api.get(`Quest/player-progress`,
            {
                params: {
                    idPlayer: idPlayer,
                    idTaskPlay: idTaskPlay
                }
            }
        );
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetRewards = async (): Promise<Reward[]> => {
    try {
        let response = await api.get(`Quest/list-rewards`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetTaskPlayRewards = async (id?: number): Promise<Reward[]> => {
    try {
        let response = await api.get(`Quest/list-task-play-rewards`, {
            params: { id: id }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchClaimReward = async (idPlayer?: string, idTaskPlay?: number): Promise<boolean> => {
    try {
        const response = await api.put("/Quest/claim-reward", {
            idPlayer: idPlayer,
            idTaskPlay: idTaskPlay,
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchCreateTaskPlay = async (taskPlay: TaskPlay, idRewards?: number[]) => {
    try {
        const response = await api.post(`Quest/create-task-play`, {
            taskPlay: taskPlay,
            idRewards: idRewards ?? [],
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchDeleteTaskPlay = async (id: number): Promise<boolean> => {
    try {
        let response = await api.delete(`Quest/delete-task-play`, {
            params: { id: id }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchUpdateTaskPlay = async (taskPlay: TaskPlay, idRewards?: number[]): Promise<boolean> => {
    try {
        const response = await api.put(`Quest/edit-task-play`, {
            taskPlay: taskPlay,
            idRewards: idRewards ?? [],
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchCreateReward = async (reward: Reward) => {
    try {
        const response = await api.post(`Quest/create-reward`, reward);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchDeleteReward = async (id: number): Promise<boolean> => {
    try {
        let response = await api.delete(`Quest/delete-reward`, {
            params: { id: id }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchUpdateReward = async (reward: Reward): Promise<boolean> => {
    try {
        const response = await api.put(`Quest/edit-reward`, reward);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}