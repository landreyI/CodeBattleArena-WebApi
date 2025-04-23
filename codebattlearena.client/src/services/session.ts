import axios, { api } from "../api/axios";
import { Player, Session } from "@/models/dbModels";

export const fetchGetSession = async (id: number): Promise<Session> => {
    try {
        let response = await api.get(`Session/info-session`, {
            params: {id: id}
        });
        return response.data;
    }
    catch(error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetSessionPlayers = async (id: number | null): Promise<Player[]> => {
    try {
        let response = await api.get(`Session/session-players`, {
            params: { id: id }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchCreateSession = async (session: Session) => {
    try {
        const response = await api.post(`Session/create-session`, session);
        return response.data;
    }
    catch(error) {
        console.error(error);
        throw error;
    }
}