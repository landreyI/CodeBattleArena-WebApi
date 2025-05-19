import { api } from "../api/axios";
import { League, LeaguePlayers } from "@/models/dbModels";

export const fetchGetLeague = async (id: number): Promise<League> => {
    try {
        let response = await api.get(`League/league`, {
            params: { id: id}
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetListLeagues = async (): Promise<League[]> => {
    try {
        let response = await api.get(`League/list-leagues`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetPlayersLeagues = async (): Promise<LeaguePlayers[]> => {
    try {
        let response = await api.get(`League/players-in-leagues`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchCreateLeague = async (league: League): Promise<boolean> => {
    try {
        const response = await api.post(`Session/create-league`, league);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchEditLeague = async (league: League): Promise<boolean> => {
    try {
        const response = await api.post(`Session/edit-league`, league);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchDeleteLeague = async (id: number): Promise<boolean> => {
    try {
        let response = await api.delete(`Session/delete-league`, {
            params: { id: id }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}