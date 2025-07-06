import { api } from "../api/axios";
import { Player } from "@/models/dbModels";
import { PlayerFilters } from "../models/filters";

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

export const fetchGetPlayersList = async (filter?: PlayerFilters): Promise<Player[]> => {
    try {
        let response = await api.get(`/Player/list-players`, {
            params: filter
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchSelectRoles = async (idPlayer?: string, roles?: string []): Promise<boolean> => {
    try {
        const response = await api.put(`/Player/select-roles`, {
            idPlayer: idPlayer,
            roles: roles,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchEditPlayer = async (player: Player): Promise<boolean> => {
    try {
        const response = await api.put(`/Player/edit-player`, player);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchChangeActiveItem = async (idPlayer?: string, idItem?: number): Promise<boolean> => {
    try {
        const response = await api.put(`/Player/change-active-item`, null, {
            params: { idPlayer, idItem }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
