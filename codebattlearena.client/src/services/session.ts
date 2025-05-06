import axios, { api } from "../api/axios";
import { Player, Session } from "@/models/dbModels";

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
        let response = await api.get(`Session/start-game`, {
            params: { idSession: idSession }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchLeaveSession = async (): Promise<boolean> => {
    try {
        let response = await api.get(`Session/leave-session`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}


export const fetchJoinSession = async (idSession: number, password?: string): Promise<boolean> => {
    try {
        let response = await api.get(`Session/join-session`, {
            params: { idSession: idSession, password: password }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetSessionsList = async (): Promise<Session[]> => {
    try {
        let response = await api.get(`Session/list-sessions`, {
            params: {  }
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