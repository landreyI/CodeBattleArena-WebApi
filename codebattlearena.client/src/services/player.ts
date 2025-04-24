import axios, { api } from "../api/axios";
import { Player, Session } from "@/models/dbModels";

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

export const fetchGetPlayerSessions = async (id: string): Promise<Session[]> => {
    try {
        let response = await api.get(`/Player/player-sessions`, {
            params: { id: id }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchEditPlayer = async (player: Player) => {
    try {
        const response = await api.post(`/Player/edit-player`, player);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
