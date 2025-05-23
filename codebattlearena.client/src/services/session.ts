import axios, { api } from "../api/axios";
import { Player, Session, PlayerSession } from "@/models/dbModels";
import { SessionFilters } from "../models/filters";

export const fetchGetSession = async (id: number): Promise<{ session: Session, isEdit: boolean }> => {
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

export const fetchGetActiveSession = async (): Promise<Session | null> => {
    try {
        let response = await api.get(`Session/active-session`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchStartGame = async (idSession: number): Promise<boolean> => {
    try {
        let response = await api.put(`Session/start-game`, null, {
            params: { idSession: idSession }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchFinishGame = async (idSession: number): Promise<boolean> => {
    try {
        let response = await api.put(`Session/finish-game`, null, {
            params: { idSession: idSession }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchBestResult = async (idSession: number): Promise<PlayerSession> => {
    try {
        let response = await api.get(`Session/best-result-session`, {
            params: { idSession: idSession }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetCountCompletedTask = async (idSession: number): Promise<number> => {
    try {
        let response = await api.get(`Session/count-completed-task`, {
            params: { idSession: idSession }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetSessionsList = async (filter?: SessionFilters): Promise<Session[]> => {
    try {
        let response = await api.get(`Session/list-sessions`, {
            params: filter
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetSessionPlayers = async (id: number): Promise<Player[]> => {
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

export const fetchsSelectTaskForSession = async (sessionId: number, taskId: number): Promise<boolean> => {
    try {
        let response = await api.get(`Session/select-task-for-session`, {
            params: {
                sessionId: sessionId,
                taskId: taskId
            }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchCreateSession = async (session: Session): Promise<{ idSession: number }> => {
    try {
        const response = await api.post(`Session/create-session`, session);
        return response.data;
    }
    catch(error) {
        console.error(error);
        throw error;
    }
}

export const fetchUpdateSession = async (seession: Session): Promise<boolean> => {
    try {
        const response = await api.put(`/Session/edit-session`, seession);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchDeleteSession = async (id: number): Promise<boolean> => {
    try {
        let response = await api.delete(`Session/delete-session`, {
            params: { id: id }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}