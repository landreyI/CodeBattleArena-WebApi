import { api } from "../api/axios";
import { Player } from "@/models/dbModels";

export const fetchGetPlayer = async (id: string): Promise<{ player: Player; isEdit: boolean }> => {
    try {
        let response = await api.get(`/Player/info-player`, {
            params: { id: id }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetPlayersList = async (): Promise<Player[]> => {
    try {
        let response = await api.get(`/Player/list-players`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchEditPlayer = async (player: Player): Promise<boolean> => {
    try {
        const response = await api.put(`/Player/edit-player`, player);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
