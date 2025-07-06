import { api } from "../api/axios";
import { Message, Player, PlayerSession, Session } from "@/models/dbModels";
import { ExecutionResult } from "@/models/executionResult";

export const fetchGetPlayerSessions = async (id: string): Promise<Session[]> => {
    try {
        let response = await api.get(`/PlayerSession/player-sessions`, {
            params: { id: id }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchFinishTaskPlayer = async (): Promise<boolean> => {
    try {
        let response = await api.put(`PlayerSession/finish-task`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchLeaveSession = async (): Promise<boolean> => {
    try {
        let response = await api.delete(`PlayerSession/leave-session`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchKickOutSession = async (idDeletePlayer?: string, idSession?: number): Promise<boolean> => {
    try {
        let response = await api.delete(`PlayerSession/kick-out-session`, {
            params: { idDeletePlayer, idSession }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}


export const fetchJoinSession = async (idSession: number, password?: string): Promise<boolean> => {
    try {
        let response = await api.put(`PlayerSession/join-session`, null, {
            params: { idSession, password }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchUpdateCodePlayer = async (sessionId?: number, code?: string): Promise<boolean> => {
    try {
        let response = await api.get(`PlayerSession/update-code-player`, {
            params: { sessionId: sessionId, code: code}
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchSendMessageSession = async (message?: string): Promise<boolean> => {
    try {
        let response = await api.get(`PlayerSession/send-message-session`, {
            params: { message: message }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchCheckCodePlayer = async (code: string): Promise<ExecutionResult> => {
    try {
        let response = await api.post(`PlayerSession/check-code-player`, { code });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchPlayerSessionInfo = async (idPlayer?: string, idSession?: number): Promise<PlayerSession | null> => {
    try {
        let response = await api.get(`PlayerSession/info-player-session`, {
            params: { playerId: idPlayer, sessionId: idSession }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
